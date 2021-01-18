// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "executionReport":
      return { executionReport: action.payload };
    case "outboundAccountPosition":
      return { outboundAccountPosition: action.payload };
    default:
      return state;
  }
};
