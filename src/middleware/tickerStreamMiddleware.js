const tickerStreamMiddleware = () => {
  let tickerSocket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connectToTicker":
        if (tickerSocket !== null) {
          tickerSocket.close();
        } //Prevents multisocket opening

        tickerSocket = new WebSocket(action.host);

        tickerSocket.onopen = () => console.log("Socket open.", action.host);
        dispatch({
          type: "connectedToTicker",
          payload: "tickerStream is open now.",
        });

        tickerSocket.onmessage = (event) =>
          dispatch(action.save(JSON.parse(event.data)));

        tickerSocket.onclose = () =>
          console.log("tickerStream closed.", action.host);
        dispatch({
          type: "disconnectedFromTicker",
          payload: "tickerStream has fully closed down.",
        });

        break;
      case "disconnectFromTicker":
        if (tickerSocket !== null) {
          tickerSocket.close();
        }

        tickerSocket = null;
        dispatch({
          type: "wipeTicker",
          payload: null,
        });

        break;
      default:
        //console.log("the next action:", action); - DEBUGGER switch!
        return next(action);
    }
  };
};

export default tickerStreamMiddleware();
