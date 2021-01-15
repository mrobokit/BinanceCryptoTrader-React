// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "BUY_ORDER":
      return { BUY: action.payload };
    case "OPEN_ORDERS":
      return action.payload;
    default:
      return state;
  }
};
