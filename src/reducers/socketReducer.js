// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "connect":
      return action;
    case "connected":
      return action;
    case "disconnect":
      return action;
    case "disconnected":
      return action;
    case "tradeSocket":
      return { tradeSocket: action.payload };
    case "tickerSocket":
      return { tickerSocket: action.payload };
    case "serverEventsSocket":
      return { serverEventsSocket: action.payload };
    default:
      return state;
  }
};
