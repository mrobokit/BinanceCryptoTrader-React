const initialConfig = {
  pair: "LINKUSDT",
  symbol: "LINK",
  fiat: "USDT",
  candleStreamNoReload: false,
  eventStreamNoReload: false,
  tradeStreamNoReload: false,
  tickerStreamNoReload: false,
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
    case "eventStreamNoReload":
      return { ...state, eventStreamNoReload: action.payload };
    case "candleStreamNoReload":
      return { ...state, candleStreamNoReload: action.payload };
    case "tradeStreamNoReload":
      return { ...state, tradeStreamNoReload: action.payload };
    case "tickerStreamNoReload":
      return { ...state, tickerStreamNoReload: action.payload };
    default:
      return state;
  }
};
