export const eventSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToEvent":
      return action;
    case "connectedToEvent":
      return action;
    case "disconnectFromEvent":
      return action;
    case "disconnectedFromEvent":
      return action;
    case "wipeEvent":
      return action;
    case "eventStream":
      if (action.payload.e === "executionReport") {
        console.log("executionReport", action.payload);
        return { ...state, executionReport: action.payload };
      } else {
        console.log("outbound", action.payload);
        return { ...state, outbound: action.payload };
      }
    default:
      return state;
  }
};
export const tickerSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToTicker":
      return action;
    case "connectedToTicker":
      return action;
    case "disconnectFromTicker":
      return action;
    case "disconnectedFromTicker":
      return action;
    case "wipeTicker":
      return action;
    case "tickerStream":
      return { data: action.payload };
    default:
      return state;
  }
};
export const tradeSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToTrade":
      return action;
    case "connectedToTrade":
      return action;
    case "disconnectFromTrade":
      return action;
    case "disconnectedFromTrade":
      return action;
    case "wipeTrade":
      return action;
    case "tradeStream":
      return { data: action.payload };
    default:
      return state;
  }
};
