# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

### `yarn build`

## INFO

## Binance Part 1 - Web Sockets and Real Time Lightweight Charts

Documentation: https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md

- The base endpoint for the public web socket stream is: wss://stream.binance.com:9443
- npm install -g wscat
- `wscat -c wss://stream.binance.com:9443/ws/btcusdt@trade`

---

{"e":"trade","E":1610381857151,"s":"BTCUSDT","t":563913029,"p":"30709.20000000","q":"0.00000900","b":4266992903,"a":4266993001,"T":1610381857150,"m":true,"M":true}

````json
{
"e": "trade", // Event type
"E": 123456789, // Event time
"s": "BNBBTC", // Symbol
"t": 12345, // Trade ID
"p": "0.001", // Price
"q": "100", // Quantity
"b": 88, // Buyer order ID
"a": 50, // Seller order ID
"T": 123456785, // Trade time
"m": true, // Is the buyer the market maker?
"M": true // Ignore
}

---

## Candleline/ Stick Stream

`wscat -c wss://stream.binance.com:9443/ws/btcusdt@kline_5m`

```json
{
  "e": "kline",
  "E": 1610382137707,
  "s": "BTCUSDT",
  "k": {
    "t": 1610382000000,
    "T": 1610382299999,
    "s": "BTCUSDT",
    "i": "5m",
    "f": 563928112,
    "L": 563945278,
    "o": "30951.39000000",
    "c": "31317.74000000",
    "h": "31517.59000000",
    "l": "30614.22000000",
    "v": "1244.62170500",
    "n": 17167,
    "x": false,
    "q": "38676686.05247512",
    "V": "622.62344100",
    "Q": "19377024.31596843",
    "B": "0"
  }
}
````

# Adding Javascript to the mix (with React)

JS WebSocket Documentation - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

- Create new component file called WebSocket.js

```js
import React from "react";

class WebSocket extends React.Component {
  componentDidMount() {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );
    console.log(socket);
  }
  render() {
    return <div className="ui container">PLACEHOLDER</div>;
  }
}

export default WebSocket;
```

- Import it into App.js and call it in return statement as <WebSocket />. Check console and voilla, you have a websocket connection.

- Now we need to receive messages from it - WebSocket.onmessage

```js
aWebSocket.onmessage = function (event) {
  console.debug("WebSocket message received:", event);
};
```
