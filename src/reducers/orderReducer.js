// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "BUY_ORDER":
      return { BUY: action.payload };
    case "ACTIVE_ORDER":
      return { ACTIVE_ORDER: action.payload };
    case "CANCEL_ORDER":
      return { CANCEL_ORDER: action.payload };
    default:
      return state;
  }
};
