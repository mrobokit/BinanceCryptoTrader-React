const process = require("process");
const { query, Client } = require("faunadb");
const CryptoJS = require("crypto-js");

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log("No FAUNADB_SERVER_SECRET in environment, skipping DB setup");
}
const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const decryptWithAES = (ciphertext) => {
  const passphrase = process.env.NETLIFY_SALT;
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

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
  /* Logged in, now go and get stuff.. */

  // Helper methods //
  const userHash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(claims.sub)); //1. I always need the user hash

  const key_value_exists = async (pos) => {
    //2. I always need to see if it is present in the database
    return await client.query(
      query.Get(query.Ref(`classes/${userHash}/${pos}`))
    );
  };

  const extractVal = async (pos) => {
    return key_value_exists(pos)
      .then((res) => {
        const value = Object.values(res.data)[0];
        const decryptedKey = decryptWithAES(value);
        console.log(decryptedKey);
        //Then decrypt it, and perform w/e with it

        return {
          statusCode: 200,
          response: "Merge ba",
        };
      })
      .catch((error) => {
        console.log(error);

        return {
          statusCode: 400,
          response: "API Key is not properly configured.",
        };
      });
  };

  // const endresult = await extractVal(2); // DO NOT RETURN THIS DIRECTlY ANYMORE, exposes API KEY!

  //Then write this error or success to dom, not console log, not to expose what line of code comes from.
  return {
    statusCode: endresult.statusCode,
    body: JSON.stringify(endresult.response),
  };
};

module.exports = { handler };
