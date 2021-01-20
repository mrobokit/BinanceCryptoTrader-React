import React from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
  storeTickerStatus,
  storeTradeStatus,
} from "../actions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config, shallowEqual);

  const eventStream = useSelector(
    (state) => state.eventStream.executionReport,
    shallowEqual
  );

  // const tradeStream = useSelector((state) => state.tradeStream);
  // const tickerStream = useSelector((state) => state.tickerStream);

  const connectToTradeStream = () => {
    dispatch(storeTradeStatus(false));
    dispatch(
      connectToTrade(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };
  const disconnectFromTradeStream = () => {
    dispatch(
      disconnectFromTrade(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };

  //Ticker
  const connectToTickerStream = () => {
    dispatch(storeTickerStatus(false));
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker`,
        storeTickerStream
      )
    );
  };
  const disconnectFromTickerStream = () => {
    dispatch(
      disconnectFromTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker`
      )
    );
  };

  return (
    <div>
      <div className="ui header">Debugers</div>
      <button className="ui mini button" onClick={() => console.log(config)}>
        config - debug
      </button>

      <button
        className="ui mini button"
        onClick={() => {
          console.log(eventStream);
        }}
      >
        event- debug
      </button>

      {/* <button
        className="ui mini button"
        onClick={() => {
          console.log(tradeStream);
        }}
      >
        trade- debug
      </button>

      <button
        className="ui mini button"
        onClick={() => {
          console.log(tickerStream);
        }}
      >
        ticker - debug
      </button> */}

      <div className="ui header">On/Off</div>
      <button
        className="ui mini button"
        onClick={() => connectToTickerStream()}
      >
        Connect To Ticker Stream
      </button>
      <br />
      <button
        className="ui mini button"
        onClick={() => disconnectFromTickerStream()}
      >
        Disconnect From Ticker Stream
      </button>
      <br />
      <br />
      <button className="ui mini button" onClick={() => connectToTradeStream()}>
        Connect To Trade Stream
      </button>
      <br />
      <button
        className="ui mini button"
        onClick={() => disconnectFromTradeStream()}
      >
        Disconnect From Trade Stream
      </button>
    </div>
  );
};

export default SettingsPage;
