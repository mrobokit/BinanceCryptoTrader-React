// Refactor using the newer useSelector, rather than connect
import React, { useEffect } from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import { connect } from "react-redux";
import { socketConnect, socketDisconnect } from "../actions";
import "./Table.css";

const Table = (props) => {
  const endpoint = () => {
    const symbolOne = "btcusdt";
    const symbolTwo = "ethusdt";
    const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
    const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

    return (
      "wss://stream.binance.com:9443/stream?streams=" +
      TRADE.join("/") +
      "/" +
      TICKER.join("/")
    );
  };

  useEffect(() => {
    console.log("Table mounted");
    props.socketConnect(endpoint());
  }, []);

  useEffect(() => {
    if (props.socket.stream == "ethusdt@trade") {
      console.log(props.socket.data);
    }
  }, [props.socket]);

  return (
    <div>
      <button onClick={() => props.socketConnect(endpoint())}>Connect</button>

      <button onClick={() => props.socketDisconnect()}>Disconnect</button>

      {/* {console.log(props.socket)} */}

      <table className="ui celled table custom-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Last 24H Data</th>
            <th>Live Trades</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Pair">{/* <CoinPair symbol={coinOne.s} /> */}</td>

            <td data-label="Last 24H Change">
              {/* <Change24H price={tickerOne.p} percentage={tickerOne.P} /> */}
            </td>

            <td data-label="Live Trades">
              {/* <CoinPrice price={coinOne.p} /> */}
            </td>
          </tr>

          {/* ETHEREUM */}
          <tr>
            <td data-label="Pair">{/* <CoinPair symbol={coinTwo.s} /> */}</td>

            <td data-label="Last 24H Change">
              {/* <Change24H price={tickerTwo.p} percentage={tickerTwo.P} /> */}
            </td>

            <td data-label="Live Trades">
              {/* <CoinPrice price={coinTwo.p} /> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { socket: state.socket };
};

export default connect(mapStateToProps, { socketConnect, socketDisconnect })(
  Table
);
