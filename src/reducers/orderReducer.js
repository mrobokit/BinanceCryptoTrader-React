// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "BUY_ORDER":
      return { ...state, buy: action.payload };
    case "SELL_ORDER":
      return { ...state, sell: action.payload };
    case "ACTIVE_ORDER":
      return { ...state, activeOrder: action.payload };
    case "CANCEL_ORDER":
      return { ...state, cancel: action.payload };
    case "HistoricalData":
      return { ...state, historicalData: action.payload };
    default:
      return state;
  }
};
