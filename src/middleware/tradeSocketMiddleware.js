const tradeSocketMiddleware = () => {
  let tradeSocket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connectToTrade":
        if (tradeSocket !== null) {
          tradeSocket.close();
        } //Prevents multisocket opening

        tradeSocket = new WebSocket(action.host);

        tradeSocket.onopen = () =>
          console.log("tradeStream open.", action.host);
        dispatch({
          type: "connectedToTrade",
          payload: "tradeStream is open now.",
        });

        // Here i need to create bunch of names instead of action.save
        tradeSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const subtype = data.s;
          // console.log(event);
          dispatch(action.save(data, subtype));
        };

        tradeSocket.onclose = () =>
          console.log("tradeStream closed.", action.host);
        dispatch({
          type: "disconnectedFromTrade",
          payload: "tradeStream has fully closed down.",
        });

        break;
      case "disconnectFromTrade":
        if (tradeSocket !== null) {
          tradeSocket.close();
        }

        tradeSocket = null;
        dispatch({
          type: "wipeTrade",
          payload: null,
        });

        break;
      default:
        //console.log("the next action:", action); - DEBUGGER switch!
        return next(action);
    }
  };
};

export default tradeSocketMiddleware();
