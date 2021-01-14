// Refactor using the newer useSelector, rather than connect
import React, { useEffect } from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import { connect } from "react-redux";
import { socketConnect, socketDisconnect } from "../actions";
import "./Table.css";

const Table = (props) => {
  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";
  const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
  const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

  const endpoint = () => {
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

  const ethereumPrice = () => {
    if (props.bitcoin_trade);

    if (props.ethereum_trade) {
      return props.ethereum_trade.p;
    }
  };

  return (
    <div>
      <button onClick={() => props.socketConnect(endpoint())}>Connect</button>

      <button onClick={() => props.socketDisconnect()}>Disconnect</button>

      {/* {console.log(props.ethereum_trade)}

      {console.log(props.bitcoin_trade)} */}

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
            <td data-label="Pair">
              {/* <CoinPair symbol={props.socket && props.socket.s == "BTCUSDT"} /> */}
              {/* <CoinPair symbol={props.socket && props.socket.s == "BTCUSDT"} /> */}
            </td>

            <td data-label="Last 24H Change">
              {/* <Change24H price={tickerOne.p} percentage={tickerOne.P} /> */}
            </td>

            <td data-label="Live Trades">
              <CoinPrice price={ethereumPrice()} />
            </td>
          </tr>

          {/* ETHEREUM */}
          <tr>
            <td data-label="Pair">
              {/* <CoinPair symbol={props.socket.ethereum} /> */}
            </td>

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
  return {
    bitcoin_trade: state.socket.bitcoin_trade,
    ethereum_trade: state.socket.ethereum_trade,
  };
};

export default connect(mapStateToProps, { socketConnect, socketDisconnect })(
  Table
);
