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
    case "tradeStream":
      return { tradeStream: action.payload };
    case "tickerStream":
      return { tickerStream: action.payload };
    case "serverEventsStream":
      return { serverEventsStream: action.payload };
    default:
      return state;
  }
};
