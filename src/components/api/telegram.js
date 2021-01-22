import axios from "axios";

export default axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_TOKEN}`,
});
