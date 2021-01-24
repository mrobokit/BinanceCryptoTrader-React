const process = require("process");
const { query, Client } = require("faunadb");

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async (event, context) => {
  const claims = context.clientContext && context.clientContext.user;
  console.log("user claims", claims);

  // console.log(event.body); - what i get from client

  if (!claims) {
    console.log("No claims! Begone!");
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: "NOT ALLOWED.",
      }),
    };
  }

  return client
    .query(
      query.Get(query.Ref(query.Collection(`secrets`), "288540451248538113")) // do not delete Id gicu :) click on each entry to give u details
    )
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

module.exports = { handler };
