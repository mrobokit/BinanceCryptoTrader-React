import React from "react";
import SymbolStream from "../components/SymbolStream";

// Store Server Notifications

const Dashboard = () => {
  //Redux Store - Config Object
  // const config = useSelector((state) => state.config);
  // const report = useSelector((state) => state.report);
  // const balance = useSelector((state) => state.wallet.balance);
  // const ACTIVE_ORDER = useSelector((state) => state.order["ACTIVE_ORDER"]);
  // const socket = useSelector((state) => state.socket);
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
    </div>
  );
};

export default Dashboard;
