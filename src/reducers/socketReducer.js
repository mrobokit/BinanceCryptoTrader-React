export const serverEventsStreamReducer = (state = [], action) => {
  switch (action.type) {
    case "connect":
      return action;
    case "connected":
      return action;
    case "disconnect":
      return action;
    case "disconnected":
      return action;
    case "wipe":
      return action;
    case "serverEventsStream":
      return { data: action.payload };
    default:
      return state;
  }
};
export const tickerSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connect":
      return action;
    case "connected":
      return action;
    case "disconnect":
      return action;
    case "disconnected":
      return action;
    case "wipe":
      return action;
    case "tickerStream":
      return { data: action.payload };
    default:
      return state;
  }
};
export const tradeSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connect":
      return action;
    case "connected":
      return action;
    case "disconnect":
      return action;
    case "disconnected":
      return action;
    case "wipe":
      return action;
    case "tradeStream":
      return { data: action.payload };
    default:
      return state;
  }
};
