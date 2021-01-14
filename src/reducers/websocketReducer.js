// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "WS_CONNECT":
      return action.host;
    case "WS_DISCONNECT":
      return action.host;
    case "WS_NEW_MESSAGE":
      return action.payload;

    default:
      return state;
  }
};
