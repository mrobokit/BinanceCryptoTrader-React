// // These only return messages

// const websocketReducer = (state = [], action) => {
//   switch (action.type) {
//     case "SOCKET_CONNECT":
//       return action;
//     case "SOCKET_CONNECTED":
//       return action.payload;
//     case "SOCKET_DISCONNECT":
//       return action;
//     case "SOCKET_DISCONNECTED":
//       return action.payload;
//     case "SOCKET_MESSAGE":
//       if (
//         action.payload.data &&
//         action.payload.data.e === "trade" &&
//         action.payload.data.s === "ETHUSDT"
//       ) {
//         return { ethereum_trade: action.payload.data }; /// VERY IMPORTANT HERE !!!!!!!!!!
//       } else if (
//         action.payload.data &&
//         action.payload.data.e === "trade" &&
//         action.payload.data.s === "BTCUSDT"
//       ) {
//         return { bitcoin_trade: action.payload.data };
//       } else if (){}
//       break;
//     default:
//       return state;
//   }
// };

// export default websocketReducer;
