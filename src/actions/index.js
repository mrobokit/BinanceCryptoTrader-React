import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

// REST API Calls
export const fetchWallet = () => async (dispatch) => {
  const query = `timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/account?${query}&signature=${hash}`);
  dispatch({ type: "FETCH_WALLET", payload: response.data });
  //console.log("Fetched wallet", response.data);
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
export const getHistoricalCandlestickData = (interval, startTime, symbol) => {
  const query = `symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${Date.now()}`;

  fetch(`https://api.binance.com/api/v3/klines?${query}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

//Super function
export const getHistoricalCandlestickDataWidthAxios = async (
  interval,
  symbol
) => {
  //&startTime=${startTime}&endTime=${Date.now() //startTime,
  const query = `symbol=${symbol}&interval=${interval}`;
  const response = await binance.get(
    `https://api.binance.com/api/v3/klines?${query}`
  ); // must be DELETE

  return response.data;
};

// Config Reducer - Actions
export const storeFiat = (fiat) => async (dispatch) => {
  dispatch({ type: `STORE_FIAT`, payload: fiat });
  //console.log(response.data);
};
export const storeSymbol = (symbol) => async (dispatch) => {
  dispatch({ type: `STORE_SYMBOL`, payload: symbol });
  //console.log(response.data);
};
export const storePair = (pair) => async (dispatch) => {
  dispatch({ type: `STORE_PAIR`, payload: pair });
  //console.log(response.data);
};
export const storeTradeStatus = (state) => async (dispatch) => {
  dispatch({ type: `TRADE_STATUS`, payload: state });
  //console.log(state);
};
export const storeTickerStatus = (state) => async (dispatch) => {
  dispatch({ type: `TICKER_STATUS`, payload: state });
  //console.log(response.data);
};

// Trade Socket
export const connectToTrade = (host, save) => ({
  type: "connectToTrade",
  host,
  save,
});
export const disconnectFromTrade = (host) => ({
  type: "disconnectFromTrade",
  host,
});

// Ticker Socket
export const connectToTicker = (host, save) => ({
  type: "connectToTicker",
  host,
  save,
});
export const disconnectFromTicker = (host) => ({
  type: "disconnectFromTicker",
  host,
});

//Event Socket
export const connectToEvent = (host, save) => ({
  type: "connectToEvent",
  host,
  save,
});
export const disconnectFromEvent = (host) => ({
  type: "disconnectFromEvent",
  host,
});

// Store Trade,Ticker and Events
export const storeTradeStream = (data, subtype) => async (dispatch) => {
  dispatch({
    type: `tradeStream`,
    payload: data,
    subtype: subtype,
  });
};
export const storeTickerStream = (data, subtype) => async (dispatch) => {
  dispatch({
    type: `tickerStream`,
    payload: data,
    subtype: subtype,
  });
};
export const storeEventStream = (data) => async (dispatch) => {
  dispatch({
    type: `eventStream`,
    payload: data,
  });
};
