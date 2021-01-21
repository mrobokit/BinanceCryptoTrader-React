const klineStreamMiddleware = () => {
  let klineSocket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connectToKline":
        console.log("We re in");
        //Prevents multisocket opening, prevents keeping socket
        if (klineSocket !== null) {
          klineSocket.close();
        }

        klineSocket = new WebSocket(action.host);

        klineSocket.onopen = () =>
          console.log("klineStream open.", action.host);
        dispatch({
          type: "connectedToKline",
          payload: "klineStream is open now.",
        });

        klineSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          //console.log(data); // - DEBUG kline
          const subtype = data.k.e;
          dispatch(action.save(data, subtype));
        };

        klineSocket.onclose = () =>
          console.log("klineStream closed.", action.host);
        dispatch({
          type: "disconnectedFromKline",
          payload: "klineStream has fully closed down.",
        });

        break;
      case "disconnectFromKline":
        if (klineSocket !== null) {
          klineSocket.close();
        }

        klineSocket = null;
        dispatch({
          type: "wipeKline",
          payload: null,
        });

        break;
      default:
        //console.log("the next action:", action); - DEBUGGER switch!
        return next(action);
    }
  };
};

export default klineStreamMiddleware();
