require("dotenv").config();

// base node fs module
const fs = require("fs");

// csv
const csv = require("fast-csv");
const csvStream = csv.format({ headers: false });

// binance-api-node
const Binance = require("binance-api-node").default;

const client = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

// main
async function run() {
  // client.ws.candles("ETHBTC", "15m", (candle) => {
  //   // Convert from JSON to CSV and write to file
  // });
  // const data = await client.accountInfo();
  // console.log(data.balances);
}

run();
