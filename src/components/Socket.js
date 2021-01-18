// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import binance from "../components/api/binance";

// import {
//   storeTradeSocket,
//   storeTickerSocket,
//   storeServerEventsSocket,
// } from "../actions";

// const Socket = ({ href, action }) => {
//   const socket = useSelector((state) => state.socket);
//   const dispatch = useDispatch();
//   const config = useSelector((state) => state.config);

//   useEffect(() => {
//     // localStorage.clear();
//     // const streamKey = localStorage.getItem("streamKey");
//     // console.log(streamKey);

//     // if (!streamKey) {
//     //   binance.post(`/userDataStream`).then(
//     //     (response) => {
//     //       console.log(response.data.listenKey);
//     //       localStorage.setItem("streamKey", response.data.listenKey);
//     //     },
//     //     (error) => {
//     //       console.log(error);
//     //     }
//     //   );
//     // }
//     // const interval = setInterval(async () => {
//     //   const response = await binance.put(
//     //     `/userDataStream?listenKey=${streamKey}`
//     //   );
//     //   console.log("Extend key", response);
//     // }, 1800000); //30 min

//     const tradeSocket = new WebSocket(href);

//     // const tickerSocket = new WebSocket(
//     //   `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker `
//     // );
//     // const serverEventsSocket = new WebSocket(
//     //   `wss://stream.binance.com:9443/ws/${streamKey}`
//     // );

//     tradeSocket.onopen = () => {
//       console.log(href, "connected");
//     };
//     // tickerSocket.onopen = () => {
//     //   console.log("Ticker -  connected.");
//     // };
//     // serverEventsSocket.onopen = () => {
//     //   console.log("Events -  connected.");
//     // };

//     tradeSocket.onclose = () => {
//       console.log(href, "disconnected");
//     };
//     // tickerSocket.onclose = () => {
//     //   console.log("Ticker -  disconnected.");
//     // };
//     // serverEventsSocket.onclose = () => {
//     //   console.log("Events -  disconnected.");
//     // };

//     tradeSocket.onmessage = (evt) => {
//       const response = JSON.parse(evt.data);
//       //console.log(response);
//       dispatch(action(response));
//     };
//     // tickerSocket.onmessage = (evt) => {
//     //   const response = JSON.parse(evt.data);
//     //   console.log(response);
//     //   dispatch(storeTickerSocket(response.data));
//     // };
//     // serverEventsSocket.onmessage = (evt) => {
//     //   const response = JSON.parse(evt.data);
//     //   dispatch(storeServerEventsSocket(response.data));
//     // };

//     return () => {
//       tradeSocket.close();
//       //   tickerSocket.close();
//       //   clearInterval(interval);

//       // not closing the serverEvents cause i want notifications at all times
//       // could add this to App itself and have it open at all times
//     };
//   }, []);

//   return <div></div>;
//   //   <div>{console.log(socket.storeTradeSocket)}</div>;
// };

// export default Socket;
