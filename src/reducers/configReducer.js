const initialConfig = {
  pair: "ETHUSDT",
  symbol: "ETH",
  fiat: "USDT",
  tradeStatus: false,
  tickerStatus: false,
};

// eslint-disable-next-line
export default (state = initialConfig, action) => {
  switch (action.type) {
    case "STORE_SYMBOL":
      return { symbol: action.payload };
    case "STORE_PAIR":
      return { pair: action.payload };
    case "STORE_FIAT":
      return { fiat: action.payload };
    case "TRADE_STATUS":
      return { tradeStatus: action.payload };
    case "TICKER_STATUS":
      return { tickerStatus: action.payload };
    default:
      return state;
  }
};
