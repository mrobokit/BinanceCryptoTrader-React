const socketMiddleware = () => {
  let socket = null;

  // store = > next => action
  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "SOCKET_CONNECT":
        if (socket !== null) {
          socket.close();
        }

        socket = new WebSocket(action.host);

        socket.onopen = () =>
          dispatch({
            type: "SOCKET_CONNECTED",
            payload: "Socket is open now.",
          });

        socket.onmessage = (event) =>
          dispatch({
            type: "SOCKET_MESSAGE",
            payload: JSON.parse(event.data),
          });

        socket.onclose = () =>
          dispatch({
            type: "SOCKET_DISCONNECTED",
            payload: "Socket has fully closed down.",
          });

        break;
      case "SOCKET_DISCONNECT":
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
