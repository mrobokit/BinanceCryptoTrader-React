import React, { useState, useEffect } from "react";
import ActiveOrders from "../components/ActiveOrders";
import Table from "../components/Table";
import Wallet from "../components/Wallet";
import Actions from "../components/Actions";
import { useSelector } from "react-redux";
import binance from "../components/api/binance";

import Snackbar from "../components/Snackbar";

const HomePage = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");
  const [executionReport, setExecutionReport] = useState("");
  const [outboundAccountPosition, setOutboundAccountPosition] = useState("");

  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";

  const ACTIVE_ORDER = useSelector((state) => state.order["ACTIVE_ORDER"]);
  const BALANCE = useSelector((state) => state.wallet["BALANCE"]);

  useEffect(() => {
    console.log("From HomePage", "Render");

    const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
    const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

    // localStorage.clear();
    const streamKey = localStorage.getItem("streamKey");
    console.log(streamKey);

    if (!streamKey) {
      binance.post(`/userDataStream`).then(
        (response) => {
          console.log(response.data.listenKey);
          localStorage.setItem("streamKey", response.data.listenKey);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // After 30 min, call this every 30 min to keep alive key

    const interval = setInterval(async () => {
      const response = await binance.put(
        `/userDataStream?listenKey=${streamKey}`
      );
      console.log("Extend key", response);
    }, 1800000); //30 min

    const ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=" +
        TRADE.join("/") +
        "/" +
        TICKER.join("/") +
        "/" +
        streamKey
    );

    ws.onopen = () => {
      console.log("Binance connected.");
    };
    ws.onclose = function () {
      console.log("Binance disconnected.");
    };
    ws.onmessage = (evt) => {
      const response = JSON.parse(evt.data);

      if (response.stream === TRADE[0]) setCoinOne(response.data);
      else if (response.stream === TRADE[1]) setCoinTwo(response.data);
      else if (response.stream === TICKER[0]) setTickerOne(response.data);
      else if (response.stream === TICKER[1]) setTickerTwo(response.data);
      else if (response.data.e === "executionReport") {
        setExecutionReport(response.data);
        console.log(response.data);
      } else if (response.data.e === "outboundAccountPosition") {
        setOutboundAccountPosition(response.data);
        console.log(response.data);
      } else {
        console.log("NEW", response.data);
      }
    };

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="nine wide column">
          {coinOne && coinTwo && tickerOne && tickerTwo ? (
            <div>
              <div className="ui header">Price Tracker</div>
              <Table
                coinOne={coinOne}
                coinTwo={coinTwo}
                tickerOne={tickerOne}
                tickerTwo={tickerTwo}
              />
            </div>
          ) : (
            <div className="ui segment" style={{ height: "320px" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
        </div>
        <div className="seven wide column">
          <div className="ui header">My Balance</div>
          <Wallet BALANCE={BALANCE} executionReport={executionReport} />
        </div>

        <div className="five wide column">
          <Actions symbol={coinTwo.s} />
        </div>

        <div className="eleven wide column">
          {coinOne && coinTwo && tickerOne && tickerTwo ? (
            <ActiveOrders
              symbol={coinTwo.s}
              ACTIVE_ORDER={ACTIVE_ORDER}
              executionReport={executionReport}
            />
          ) : (
            <div className="ui segment" style={{ height: "120px" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
        </div>

        <Snackbar data={executionReport} />
        <Snackbar data={outboundAccountPosition} />
      </div>
    </div>
  );
};

export default HomePage;
