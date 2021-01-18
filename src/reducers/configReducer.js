const initialConfig = { pair: "ETHUSDT", symbol: "ETH", fiat: "USDT" };

// eslint-disable-next-line
export default (state = initialConfig, action) => {
  switch (action.type) {
    case "STORE_SYMBOL":
      return { SYMBOL: action.payload };
    case "STORE_PAIR":
      return { PAIR: action.payload };
    case "STORE_FIAT":
      return { FIAT: action.payload };
    default:
      return state;
  }
};
