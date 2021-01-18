// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "storeTradeSocket":
      return { storeTradeSocket: action.payload };
    case "storeTickerSocket":
      return { storeTickerSocket: action.payload };
    case "storeServerEventsSocket":
      return { storeServerEventsSocket: action.payload };
    default:
      return state;
  }
};
