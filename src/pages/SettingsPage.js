/* eslint-disable */
import React, { useState } from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
  storeTradeStreamNoReload,
  storeTickerStreamNoReload,
  getHistoricalCandlestickDataWidthAxios,
} from "../actions";

import { useIdentityContext } from "react-netlify-identity";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config, shallowEqual);
  const { user, isLoggedIn, authedFetch } = useIdentityContext();
  // const [myData, setMyData] = useState([]);

  // const eventStream = useSelector(
  //   (state) => state.eventStream.executionReport,
  //   shallowEqual
  // );
  // const tradeStream = useSelector((state) => state.tradeStream);
  //const tickerStream = useSelector((state) => state.tickerStream);
  // const klineStream = useSelector((state) => state.klineStream);

  const parseBinanceDataForChart = async () => {
    const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
      "1m",
      "LINKUSDT"
    );

    const turnArrayOfArraysIntoAnArrayOfObjects = fetchArrayOfArrays.map(
      function (x) {
        return {
          date: x[0],
          open: x[1],
          high: x[2],
          low: x[3],
          close: x[4],
          volume: x[5],
        };
      }
    );

    return turnArrayOfArraysIntoAnArrayOfObjects;
  };

  const connectToTradeStream = () => {
    dispatch(storeTradeStreamNoReload(false));
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

  const connectToTickerStream = () => {
    dispatch(storeTickerStreamNoReload(false));
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
      {console.log(user)} {/* DELETE MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
      <div id="protected_sudo_only">
        {isLoggedIn && user.app_metadata.roles == "owner" ? (
          <div>
            <div className="ui header">Netlify/Fauna DB Debuggers</div>
            <button className="ui button purple" disabled>
              Empty
            </button>
            <button
              className="ui button yellow"
              onClick={() =>
                console.log(
                  authedFetch.post("/api/protected", {
                    body: JSON.stringify({
                      payload: "CAKKDSL",
                    }),
                  })
                )
              }
            >
              authedFetchServerless
            </button>
            <button
              className="ui button black"
              onClick={() =>
                console.log(authedFetch.get("/api/protected-read-test"))
              }
            >
              fauna protected read test
            </button>

            <button
              className="ui button yellow"
              onClick={() =>
                authedFetch
                  .post("/api/protected-create-db-and-store-key", {
                    body: JSON.stringify({
                      BAK: "some_fake_key",
                      id: 1,
                    }),
                  })
                  .then((response) => console.log(response))
                  .catch((e) => console.log(e))
              }
            >
              fauna protected create db and key
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {isLoggedIn ? (
        <div id="accessible_to_logged_in_only" className="ui segment small">
          <span className="ui header ">Store API Keys</span>

          <form name="safeStorage">
            <input
              className="ui input"
              type="text"
              placeholder="Binance API Key"
            />
            <input
              className="ui input"
              type="text"
              placeholder="Binance Secret Key"
            />
            <input
              className="ui input"
              type="text"
              placeholder="Telegram API Key"
            />
            <button className="ui button green" type="submit" disabled>
              Send
            </button>
          </form>
        </div>
      ) : (
        "Not logged in  user"
      )}
    </div>
  );
};

export default SettingsPage;

// <div className="ui header">App Debugers</div>
// <button
//   className="ui mini button"
//   onClick={() => console.log(config)}
// >
//   config - debug
// </button>
// <button
//   className="ui mini button"
//   onClick={() => parseBinanceDataForChart()}
// >
//   Debug Historical Candlestick API Data
// </button>

{
  /* <button className="ui mini button" onClick={() => console.log(config)}>
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
      <button
        className="ui mini button"
        onClick={() => {
          console.log(tradeStream);
        }}
      >
        trade- debug
      </button> */
}

{
  /* <button
        className="ui mini button"
        onClick={() => {
          console.log(tradeStream);
        }}
      >
        trade- debug
      </button> */
}

{
  /* <button
        className="ui mini button"
        onClick={() => {
          console.log(tickerStream);
        }}
      >
        ticker - debug
      </button> */
}
{
  /* <button
        className="ui mini button"
        onClick={() => {
          console.log(klineStream);
        }}
      >
        kline - debug
      </button> */
}

{
  /* <br />
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
      </button> */
}
