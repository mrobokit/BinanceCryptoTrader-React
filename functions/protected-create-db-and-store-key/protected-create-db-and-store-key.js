#!/usr/bin/env node
const process = require("process");
const { query, Client } = require("faunadb");
const CryptoJS = require("crypto-js");

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log("No FAUNADB_SERVER_SECRET in environment, skipping DB setup");
}
const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async (event, context) => {
  const claims = context.clientContext && context.clientContext.user;
  if (!claims) {
    console.log("No claims! Begone!");
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: "NOT ALLOWED.",
      }),
    };
  }

  // User is authenticated, moving on...

  // Hashing userID, then outputting a stringified hex that can be stored in DB ( unrecoverable )
  const encryptWithAES = (text) => {
    const passphrase = process.env.NETLIFY_SALT;
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };
  const decryptWithAES = (ciphertext) => {
    const passphrase = process.env.NETLIFY_SALT;
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };
  const data = JSON.parse(event.body);
  const item = {
    data,
  };
  // console.log(item);

  const key = Object.keys(item.data)[0]; // e.g "BAK"
  const hashInHexUserId = CryptoJS.enc.Hex.stringify(
    CryptoJS.SHA256(claims.sub)
  ); // Make it HMACSHA256 to make it even saltier :)
  const hashedKey = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(key));
  const newValue = Object.values(item.data)[0]; // e.g the new secret

  const encryptedValue = encryptWithAES(newValue);

  // const decryptedKey = decryptWithAES(encryptedKey);
  // const decryptedValue = decryptWithAES(encryptedValue);

  // console.log(decryptedKey, decryptedValue);

  const newItem = {
    data: {
      [hashedKey]: encryptedValue,
    },
  };

  const db_exists = async () => {
    return await client.query(
      query.Get(query.Ref(`classes/${hashInHexUserId}`))
    );
  };
  const create_database = async () => {
    return await client.query(
      query.Create(query.Ref("classes"), { name: hashInHexUserId })
    );
  };
  const create_record = async () => {
    // This will create it even if there is one identical ( must chech before to see if exists, must provide an id object )
    return await client.query(
      query.Create(
        query.Ref(query.Collection(`${hashInHexUserId}`), item.data.id),
        newItem
      )
    );
  };
  const update_record = async () => {
    client.query(
      query.Update(
        query.Ref(query.Collection(`${hashInHexUserId}`), item.data.id),
        {
          data: {
            [hashedKey]: encryptedValue,
          },
        }
      )
    );
  };

  db_exists()
    .then(() => {
      console.log("Database exists, creating the record...");
      create_record()
        .then(() => {
          console.log("Successfully created the record. Exiting...");
        })
        .catch((e) => {
          if (e.message === "instance already exists") {
            console.log("Record exists, updating it...");

            update_record()
              .then(() => {
                console.log("Updated the record. Exiting..");
              })
              .catch((error) => {
                console.log(error);
                console.log("Error happened...");
              });
          } else if (e.message === "invalid argument") {
            console.log("invalid argument", e);

            return {
              statusCode: 400,
              body: JSON.stringify("invalid argument"),
            };
          } else {
            console.log("Exception_XX", e);
          }
        });
    })
    .catch((e) => {
      if (e.message === "invalid ref") {
        console.log("Database doesn't exist, creating it.");

        create_database()
          .then(() => {
            console.log("Created DB, saving record...");
            // No need for further checks, we`ve just created an empty database and directly saving something in it.
            create_record()
              .then(() => console.log("Created record. Exiting..."))
              .catch(() => console.log("Something bad happened..."));
          })
          .catch((e) => console.log("Could not create DB.Exiting..."));
      }

      return {
        statusCode: 400,
        body: JSON.stringify("Exception error. Contact your developer."),
      };
    });

  return {
    statusCode: 200,
    body: JSON.stringify("ok"),
  };
};

module.exports = { handler };
