import React, { useState, useEffect } from "react";
import ActiveOrders from "../components/ActiveOrders";
import SymbolTracker from "../components/SymbolTracker";
import BuySell from "../components/BuySell";
import { useDispatch, useSelector } from "react-redux";
import binance from "../components/api/binance";

// Store Server Notifications
import { storeExecutionReport, storeOutboundAccountPosition } from "../actions";

import Snackbar from "../components/Snackbar";

const Dashboard = () => {
  //Redux Store - Config Object
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const report = useSelector((state) => state.report);
  const balance = useSelector((state) => state.wallet.balance);

  //Streams
  const [trade, setTrade] = useState("");
  const [ticker, setTicker] = useState("");

  // Server Notifications
  // const [executionReport, setExecutionReport] = useState("");
  // const [outboundAccountPosition, setOutboundAccountPosition] = useState("");

  //Redux Store
  const ACTIVE_ORDER = useSelector((state) => state.order["ACTIVE_ORDER"]);
  const BALANCE = useSelector((state) => state.wallet["BALANCE"]);

  useEffect(() => {
    console.log("From Dashboard", "Render");

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
      `wss://stream.binance.com:9443/stream?streams=${config.pair.toLowerCase()}@trade/${config.pair.toLowerCase()}@ticker/${streamKey}`
    );

    ws.onopen = () => {
      console.log("Binance connected.");
    };
    ws.onclose = function () {
      console.log("Binance disconnected.");
    };
    ws.onmessage = (evt) => {
      const response = JSON.parse(evt.data);

      if (response.stream === `${config.pair.toLowerCase()}@trade`)
        setTrade(response.data);
      else if (response.stream === `${config.pair.toLowerCase()}@ticker`)
        setTicker(response.data);
      else if (response.data.e === "executionReport") {
        dispatch(storeExecutionReport(response.data));
        // console.log(response.data);
      } else if (response.data.e === "outboundAccountPosition") {
        dispatch(storeOutboundAccountPosition(response.data));
        // console.log(response.data);
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
        <div className="five wide column">
          {trade && ticker ? (
            <div>
              <div className="ui header">Price Tracker</div>
              <SymbolTracker trade={trade} ticker={ticker} />
            </div>
          ) : (
            <div className="ui segment" style={{ height: "100%" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
        </div>

        <div className="five wide column">
          <BuySell
            pair={config.pair}
            symbol={config.symbol}
            fiat={config.fiat}
            trade={trade}
            balance={balance}
          />
          {/*// gotta ait for config.pair to update  to not be able to buy before it loads*/}
        </div>

        <div className="eleven wide column">
          {trade && ticker ? (
            <ActiveOrders
              pair={config.pair}
              ACTIVE_ORDER={ACTIVE_ORDER}
              executionReport={report.executionReport}
            />
          ) : (
            <div className="ui segment" style={{ height: "120px" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
        </div>

        <Snackbar data={report.executionReport} />
        <Snackbar data={report.outboundAccountPosition} />
      </div>
    </div>
  );
};

export default Dashboard;
