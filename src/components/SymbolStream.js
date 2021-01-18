import React, { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
  storeTickerSocket,
} from "../actions";
import "./SymbolStream.css";
import { useSelector, useDispatch } from "react-redux";
import { CoinPair } from "../components/Coin";

const SymbolStream = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  //const socket = useSelector((state) => state.socket); - if i were connected to socket, it would rerender whole component!

  // const connectToTrade();
  const connectToTicker = () => {
    dispatch(
      connectToSocket(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`,
        storeTickerSocket
      )
    );
  };
  const disconnectFromTicker = () => {
    dispatch(
      disconnectFromSocket(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`
      )
    );
  };
  // const connectToEvents();

  useEffect(() => {
    console.log("Dobby is a free elf!");
    connectToTicker();
  }, []);

  return (
    <div>
      <table className="ui celled table custom-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Live Trades</th>
            <th>Last 24H Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Pair">
              <CoinPair />
            </td>

            {/*
          <td data-label="Live Trades">
            <CoinPrice price={filteredTrade().p} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H
              price={filteredTicker().p}
              percentage={filteredTicker().P}
            />
          </td> */}
          </tr>
        </tbody>
      </table>
      <button onClick={() => connectToTicker()}>
        Connect To Ticker Stream
      </button>
      <br />
      <button onClick={() => disconnectFromTicker()}>
        Disconnect From Ticker Stream
      </button>
    </div>
  );
};

export default SymbolStream;
