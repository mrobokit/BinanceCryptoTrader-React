import React, { useState, useEffect } from "react";

const WebSocket = () => {
  const [socket, setSocket] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    setSocket(ws);

    ws.onmessage = function (event) {
      console.debug("WebSocket message received:", event);
    };
  });

  return <div>DODDSD</div>;
};

export default WebSocket;
