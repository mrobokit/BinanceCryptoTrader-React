const eventStreamMiddleware = () => {
  let eventSocket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connectToEvent":
        if (eventSocket !== null) {
          eventSocket.close();
        } //Prevents multisocket opening

        eventSocket = new WebSocket(action.host);

        eventSocket.onopen = () =>
          console.log("eventSocket open.", action.host);
        dispatch({
          type: "connectedToEvent",
          payload: "eventStream is open now.",
        });

        eventSocket.onmessage = (event) => {
          dispatch(action.save(JSON.parse(event.data)));
          //console.log(JSON.parse(event.data));
        };

        eventSocket.onclose = () =>
          console.log("eventStream closed.", action.host);
        dispatch({
          type: "disconnectedFromEvent",
          payload: "eventStream has fully closed down.",
        });

        break;
      case "disconnectFromEvent":
        if (eventSocket !== null) {
          eventSocket.close();
        }

        eventSocket = null;
        dispatch({
          type: "wipeEvent",
          payload: null,
        });

        break;
      default:
        //console.log("the next action:", action); - DEBUGGER switch!
        return next(action);
    }
  };
};

export default eventStreamMiddleware();
