import React from "react";
import SymbolStream from "../components/SymbolStream";
import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";
import OpenOrders from "../components/OpenOrders";

const Dashboard = () => {
  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="six wide column">
          <SymbolStream />
          <div className="ui segment">
            <div className="ui header">Take Action</div>
            <BuySell />
          </div>
          <div className="ui segment">
            <OpenOrders />
          </div>
          <div className="ui segment">
            <EventStream />
          </div>
        </div>
        <div className="six wide column"></div>
      </div>
    </div>
  );
};

export default Dashboard;
