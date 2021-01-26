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
      .then((res) => {
        const value = Object.values(res.data)[0];
        return {
          statusCode: 200,
          response: value,
        };
      })
      .catch((e) => {
        return {
          statusCode: 400,
          response: e.description,
        };
      });
  };
  const decryptAndReturn = async (pos) => {
    return key_value_exists(pos)
      .then((res) => {
        if (res.statusCode === 400 && pos == 1) {
          return {
            statusCode: 400,
            response: "API Key is not properly configured.",
          };
        } else if (res.statusCode === 400 && pos == 2) {
          return {
            statusCode: 400,
            response: "API Secret is not properly configured.",
          };
        } else if (res.statusCode === 200) {
          const value = res.response;
          const decryptedKey = decryptWithAES(value);
          return {
            statusCode: 200,
            response: decryptedKey,
          };
        } else {
          return {
            statusCode: 400,
            response: "Exception error.",
          };
        }
      })
      .catch((error) => {
        console.log(error);

        return {
          statusCode: 400,
          response: "Could not find record.",
        };
      });
  };

  const get_both_keys = async () => {
    const key1 = await decryptAndReturn(1);
    const key2 = await decryptAndReturn(2);

    if (key1.statusCode === 400 && key2.statusCode === 400) {
      return {
        statusCode: 400,
        response: "API Key & API Secret are not configured.",
      };
    } else if (key1.statusCode === 400 && key2.statusCode === 200) {
      return {
        statusCode: 400,
        response: "API Key is not configured.",
      };
    } else if (key1.statusCode === 200 && key2.statusCode === 400) {
      return {
        statusCode: 400,
        response: "API Secret is not configured.",
      };
    } else {
      return {
        statusCode: 200,
        response: "Both keys configured",
      };
    }
  };

  const run = async () => {
    return decryptAndReturn(1)
      .then((res) => {
        if (res.statusCode === 400) {
          return {
            statusCode: 400,
            response: "API key is not  configured. XOXOX",
          };
        }
        return decryptAndReturn(2)
          .then((res) => {
            if (res.statusCode === 400) {
              return {
                statusCode: 400,
                response: "API Secret is not  configured. YAYA",
              };
            }

            // HERE I DO THE BINANCE API RUN
            console.log("All is well");

            return {
              statusCode: 200,
              response: "Got both keys",
            };
          })
          .catch((e) => {
            console.log(e);
            return {
              statusCode: 400,
              response: "Error 1000x",
            };
          });
      })
      .catch((e) => {
        console.log(e);
        return {
          statusCode: 400,
          response: "Error 9283x",
        };
      });
  };

  const endresult = await get_both_keys();

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
