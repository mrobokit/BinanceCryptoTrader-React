const socketMiddleware = () => {
  let socket = null;

  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "connect":
        // if (socket !== null) {
        //   socket.close();
        // }

        socket = new WebSocket(action.host);

        socket.onopen = () => console.log("Socket open.");
        dispatch({
          type: "connected",
          payload: "Socket is open now.",
        });

        socket.onmessage = (event) =>
          dispatch(action.save(JSON.parse(event.data)));

        socket.onclose = () => console.log("Socket closed.");
        dispatch({
          type: "disconnected",
          payload: "Socket has fully closed down.",
        });

        break;
      case "disconnect":
        if (socket !== null) {
          socket.close();
        }

        socket = null;

        break;
      default:
        //console.log("the next action:", action); - DEBUGGER switch!
        return next(action);
    }
  };
};

export default socketMiddleware();
