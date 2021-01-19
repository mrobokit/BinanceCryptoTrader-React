import React from "react";
import SymbolStream from "../components/SymbolStream";
import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";

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
        <div className="six wide column">
          <div className="ui header">Price Tracker</div>
          <SymbolStream />

          <div className="ui header">Take Action</div>
          <BuySell />
        </div>

        <div className="six wide column">
          <EventStream />
        </div>

        {/* <div className="eleven wide column">
          {trade && ticker ? (
            <OpenOrders
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
