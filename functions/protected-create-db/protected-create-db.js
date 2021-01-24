#!/usr/bin/env node
const process = require("process");
const { query, Client } = require("faunadb");

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

  if (!process.env.FAUNADB_SERVER_SECRET) {
    console.log("No FAUNADB_SERVER_SECRET in environment, skipping DB setup");
  }
  console.log("Create the database!");

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  return client
    .query(query.Create(query.Ref("classes"), { name: claims.sub }))
    .then(() => {
      console.log(`Created items "${claims.sub}"`);
      return client
        .query(
          query.Create(query.Ref("indexes"), {
            name: "storage",
            source: query.Ref(`classes/${claims.sub}`),
            active: true,
          })
        )
        .then((response) => {
          console.log("Database created", response);
          /* Success! return the response with statusCode 200 */
          return {
            statusCode: 200,
            body: JSON.stringify("Database created", response),
          };
        });
    })

    .catch((error) => {
      if (
        error.requestResult.statusCode === 400 &&
        error.message === "instance not unique"
      ) {
        console.log("DB already exists");
      }

      console.log("error", JSON.parse(error.requestResult.responseRaw));

      return {
        statusCode: 400,
        body: JSON.stringify(error.requestResult.responseRaw),
      };
    });
};

module.exports = { handler };
