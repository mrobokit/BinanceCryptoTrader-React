const initialConfig = {
  pair: "LINKUSDT",
  symbol: "LINK",
  fiat: "USDT",
  tradeStatus: false,
  tickerStatus: false,
  klineStatus: false,
  symbolList: [
    { name: "ENJ" },
    { name: "XLM" },
    { name: "BCH" },
    { name: "LTC" },
    { name: "XRP" },
    { name: "DOT" },
    { name: "ADA" },
    { name: "LINK" },
    { name: "BTC" },
  ],
};

// ...state very important, else after just one dispatch, the entire store gets wiped
// eslint-disable-next-line
export default (state = initialConfig, action) => {
  switch (action.type) {
    case "STORE_SYMBOL":
      return { ...state, symbol: action.payload };
    case "STORE_PAIR":
      return { ...state, pair: action.payload };
    case "STORE_FIAT":
      return { ...state, fiat: action.payload };
    case "TRADE_STATUS":
      return { ...state, tradeStatus: action.payload };
    case "TICKER_STATUS":
      return { ...state, tickerStatus: action.payload };
    case "KLINE_STATUS":
      return { ...state, klineStatus: action.payload };
    default:
      return state;
  }
};
