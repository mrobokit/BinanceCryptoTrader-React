import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

// Async, With Thunk,
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

  const response = await binance.post(`/order?${query}&signature=${hash}`);

  dispatch({ type: `${side}_ORDER`, payload: response.data }); // BUY_ORDER or SELL_ORDER effectively
  console.log(response.data);
};

export const fetchOrder = async (endpoint, symbol, setter = null) => {
  const query = `symbol=${symbol}&timestamp=${Date.now()}`;
  const secretKey = process.env.REACT_APP_API_SECRET;
  const hash = CryptoJS.HmacSHA256(query, secretKey);

  const myHeaders = new Headers();
  myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.binance.com/api/v3/${endpoint}?${query}&signature=${hash}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setter(result); //crucial for rerendering
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};
//
//
//
//
export const cancelOrder = async (orderId, symbol, setter = null) => {
  const query = `symbol=${symbol}&orderId=${orderId}&timestamp=${Date.now()}`;
  const secretKey = process.env.REACT_APP_API_SECRET;
  const hash = CryptoJS.HmacSHA256(query, secretKey);

  const myHeaders = new Headers();
  myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.binance.com/api/v3/order?${query}&signature=${hash}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //setter(result);
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};

// In-house Websockets Middleware
// Step 1 ✅- Create an action that returns an object of type .... Go to Home Page step 2, link back to here
// export const socketConnect = (host) => ({ type: "SOCKET_CONNECT", host });
// export const socketConnected = () => ({ type: "SOCKET_CONNECTED" });
// export const socketDisconnect = () => ({
//   type: "SOCKET_DISCONNECT",
// });
// export const socketDisconnected = () => ({
//   type: "SOCKET_DISCONNECTED",
// });
// export const socketReceiveMessage = () => ({
//   type: "SOCKET_MESSAGE",
// });
