import axios from "axios";

export default axios.create({
  baseURL: "https://api.binance.com/api/v3",
  headers: { "X-MBX-APIKEY": `${process.env.REACT_APP_API_KEY}` },
});
