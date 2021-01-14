const socketMiddleware = () => {
  let socket = null;

  // store = > next => action
  return ({ dispatch }) => (next) => (action) => {
    switch (action.type) {
      case "WS_CONNECT":
        socket = new WebSocket(action.host);

        console.log("websocket opened");

        socket.onopen = (event) =>
          dispatch({ type: "WS_CONNECT", host: event.target.url });
        socket.onmessage = (event) =>
          dispatch({
            type: "WS_NEW_MESSAGE",
            payload: JSON.parse(event.data),
          });
        socket.onclose = (event) =>
          dispatch({ type: "WS_DISCONNECT", host: event.target.url });

        break;
      case "WS_DISCONNECT":
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log("websocket closed");
        break;
      default:
        //console.log("the next action:", action); - for debug!
        return next(action);
    }
  };
};

export default socketMiddleware();
