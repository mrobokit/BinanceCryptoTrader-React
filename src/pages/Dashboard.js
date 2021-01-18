import React, { useState, useEffect } from "react";
import ActiveOrders from "../components/ActiveOrders";
import SymbolStream from "../components/SymbolStream";
import BuySell from "../components/BuySell";
import { useSelector } from "react-redux";
import { CoinPair } from "../components/Coin";

// Store Server Notifications
import { storeExecutionReport, storeOutboundAccountPosition } from "../actions";

import Snackbar from "../components/Snackbar";

const Dashboard = () => {
  //Redux Store - Config Object
  const config = useSelector((state) => state.config);
  const report = useSelector((state) => state.report);
  const balance = useSelector((state) => state.wallet.balance);
  const ACTIVE_ORDER = useSelector((state) => state.order["ACTIVE_ORDER"]);
  const socket = useSelector((state) => state.socket);
  //Streams
  // Server Notifications
  // const [executionReport, setExecutionReport] = useState("");
  // const [outboundAccountPosition, setOutboundAccountPosition] = useState("");

  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="five wide column">
          <div className="ui header">Price Tracker</div>
          <SymbolStream />
        </div>
        {/* 
        <div className="five wide column">
          <BuySell
            pair={config.pair}
            symbol={config.symbol}
            fiat={config.fiat}
            trade={trade}
            balance={balance}
          />
    
        </div> */}

        {/* <div className="eleven wide column">
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
        </div> */}

        {/* <Snackbar data={report.executionReport} />
        <Snackbar data={report.outboundAccountPosition} /> */}
      </div>
      <CoinPair />
    </div>
  );
};

export default Dashboard;
