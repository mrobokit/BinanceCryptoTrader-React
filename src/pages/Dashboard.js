import React from "react";
import SymbolStream from "../components/SymbolStream";

import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";
import OpenOrders from "../components/OpenOrders";
import Searchcrypto from "../components/SearchCrypto";

import MyChart from "../components/chart/MyChart";

const Dashboard = () => {
  return (
    <div className="ui container segment">
      <div className="ui grid">
        <div className="six wide column">
          <Searchcrypto />
          <SymbolStream />
          <div className="ui segment" style={{ height: "215px" }}>
            <BuySell />
          </div>
        </div>
        <div
          id="chartID"
          className="ten wide column"
          style={{ height: "412px" }}
        >
          <MyChart />
        </div>
        <div className="sixteen wide column">
          <div className="ui segment">
            <OpenOrders />
          </div>
          <div className="ui segment">
            <EventStream />
          </div>
        </div>

        <div className="sixteen wide column">
          <div className="ui segment"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
