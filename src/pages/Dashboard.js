import React from "react";
import SymbolStream from "../components/SymbolStream";
import MultipleSymbolStream from "../components/MultipleSymbolStream";
import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";
import OpenOrders from "../components/OpenOrders";
import Searchcrypto from "../components/SearchCrypto";

const Dashboard = () => {
  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="six wide column">
          <Searchcrypto />

          {/* <SymbolStream /> */}
          <MultipleSymbolStream />
          <div className="ui segment">
            <BuySell />
          </div>
        </div>
        <div className="sixteen wide column">
          <div className="ui segment">
            <OpenOrders />
          </div>
          <div className="ui segment">
            <EventStream />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
