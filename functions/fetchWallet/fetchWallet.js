const process = require("process");
const { query, Client } = require("faunadb");
const CryptoJS = require("crypto-js");
const axios = require("axios");

const binance = axios.create({
  baseURL: "https://api.binance.com/api/v3",
  headers: { "X-MBX-APIKEY": `${"PUT HERE FROM DB"}` },
});

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
    return client
      .query(query.Get(query.Ref(`classes/${userHash}/${pos}`)))
      .then(() => {
        console.log("All well.");
        return {
          statusCode: 200,
          response: "Got it",
        };
      })
      .catch(() => {
        console.log("ERROR FROM HERE");
        return {
          statusCode: 400,
          response: "Cannot be found",
        };
      });
  };
  const get_both = async () => {
    const decryptAndReturn = async (pos) => {
      return key_value_exists(pos)
        .then((res) => {
          const value = Object.values(res.data)[0];

          if (value !== undefined) {
            const decryptedKey = decryptWithAES(value);
            return {
              statusCode: 200,
              response: decryptedKey,
            };
          } else {
            return {
              statusCode: 400,
              response: "API Key is not properly configured.",
            };
          }

          //Then decrypt it, and perform w/e with it

          //grab value 2 as well, i need both keys
        })
        .catch((error) => {
          console.log(error);

          return {
            statusCode: 400,
            response: "API Key is not properly configured.",
          };
        });
    };

    const first = await decryptAndReturn(1);
    const second = await decryptAndReturn(2);

    if (first.statusCode === 200 && second.statusCode === 200) {
      return {
        first: first.response,
        second: second.response,
      };
    } else if (first.statusCode === 400 && second.statusCode === 400) {
      return {
        statusCode: 400,
        response: "API Key & Secret have not been saved yet.",
      };
    } else if (first.statusCode === 400) {
      return {
        statusCode: 400,
        response: "API Key has not been saved yet.",
      };
    } else if (second.statusCode === 400) {
      return {
        statusCode: 400,
        response: "API Secret has not been saved yet.",
      };
    } else {
      return {
        statusCode: 400,
        response: "Error exception 10000",
      };
    }
  };

  const run = async () => {
    return get_both()
      .then(() => {
        // console.log("Hi");
        return {
          statusCode: 200,
          response: "Got both keys.",
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          statusCode: 400,
          response: "Error 200",
        };
      });
  };

  const endresult = await run();

  //Then write this error or success to dom, not console log, not to expose what line of code comes from.
  return {
    statusCode: endresult.statusCode,
    body: JSON.stringify(endresult.response),
  };
};

module.exports = { handler };

// const query = `timestamp=${Date.now()}`;
// const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

// const response = await binance.get(`/account?${query}&signature=${hash}`);
