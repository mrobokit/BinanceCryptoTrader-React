import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

export const fetchWallet = () => async (dispatch) => {
  const query = `timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/account?${query}&signature=${hash}`);
  dispatch({ type: "FETCH_WALLET", payload: response.data });
  console.log("Fetched wallet", response.data);
};
export const tradeOrder = (side, symbol, qt, price, type = "LIMIT") => async (
  dispatch
) => {
  const query = `symbol=${symbol}&side=${side}&type=${type}&quantity=${qt}&price=${price}&timeInForce=GTC&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.post(`/order?${query}&signature=${hash}`); // must be POST

  dispatch({ type: `${side}_ORDER`, payload: response.data }); // BUY_ORDER or SELL_ORDER effectively
  console.log(response.data);
};
export const activeOrder = (symbol) => async (dispatch) => {
  const query = `symbol=${symbol}&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/openOrders?${query}&signature=${hash}`); // must be GET
  dispatch({ type: `ACTIVE_ORDER`, payload: response.data }); // BUY_ORDER or SELL_ORDER effectively
  //console.log(response.data);
};
export const cancelOrder = (orderId, symbol) => async (dispatch) => {
  const query = `symbol=${symbol}&orderId=${orderId}&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.delete(`/order?${query}&signature=${hash}`); // must be DELETE
  dispatch({ type: `CANCEL_ORDER`, payload: response.data });
  //console.log(response.data);
};
