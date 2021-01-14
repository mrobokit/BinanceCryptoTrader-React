import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

// Async, With Thunk,
export const fetchWallet = () => async (dispatch) => {
  const query = `timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/account?${query}&signature=${hash}`);
  dispatch({ type: "FETCH_WALLET", payload: response.data });
};

// In-house Websockets Middleware
// Step 1 ✅- Create an action that returns an object of type .... Go to Home Page step 2, link back to here
export const wsConnect = (host) => ({ type: "WS_CONNECT", host });
export const wsDisconnect = (host) => ({ type: "WS_DISCONNECT", host });
export const wsNewMessage = (payload) => ({ type: "WS_NEW_MESSAGE", payload });
