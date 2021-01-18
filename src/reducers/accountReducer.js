// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_WALLET":
      return { balance: action.payload.balances };
    default:
      return state;
  }
};
