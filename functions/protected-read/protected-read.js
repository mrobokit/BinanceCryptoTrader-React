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
  /* Logged in, now go and get stuff.. */

  // Helper methods //
  const userHash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(claims.sub)); //1. I always need the user hash
  const db_exists = async () => {
    //2. I always need to see if it is present in the database
    return await client.query(query.Get(query.Ref(`classes/${userHash}`)));
  };

  var myVar;

  const getAPI = async () => {
    return db_exists()
      .then((result) => {
        //console.log(result);
        return "CE TARE";
      })
      .catch((error) => {
        //console.log(error);
        return result;
      });
  };

  // const getAPISecret = async () => {};
  // const getTelegram = async () => {};

  const myvar = await getAPI();

  return {
    statusCode: 200,
    body: JSON.stringify(myvar),
  };
};

module.exports = { handler };
