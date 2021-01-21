const tickerStreamMiddleware = () => {
  let tickerSocket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connectToTicker":
        //Prevents multisocket opening, prevents keeping socket
        if (tickerSocket !== null) {
          tickerSocket.close();
        }

        tickerSocket = new WebSocket(action.host);

        tickerSocket.onopen = () =>
          console.log("tickerStream open.", action.host);
        dispatch({
          type: "connectedToTicker",
          payload: "tickerStream is open now.",
        });

        tickerSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          //console.log(data);  - DEBUG ticker
          const subtype = data.s;
          dispatch(action.save(data, subtype));
        };

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
