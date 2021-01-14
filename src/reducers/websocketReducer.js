import { ActionTypes } from "react-websockets-middleware";

// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case ActionTypes.WEBSOCKET_RECEIVE_DATA:
      return {
        ...state,
        payload: state.payload,
        endpoint: state.endpoint,
      };
    case ActionTypes.WEBSOCKET_CONNECTED:
      return {
        ...state,
        payload: state.payload,
        endpoint: state.endpoint,
      };
    case ActionTypes.WEBSOCKET_DISCONNECTED:
      return {
        ...state,
        payload: state.payload,
        endpoint: state.endpoint,
      };
    case ActionTypes.WEBSOCKET_ERROR:
      return {
        ...state,
        payload: state.payload,
        endpoint: state.endpoint,
      };
    default:
      return state;
  }
};
