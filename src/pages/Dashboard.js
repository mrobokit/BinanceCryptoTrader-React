import React from "react";
import SymbolStream from "../components/SymbolStream";

import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";
import OpenOrders from "../components/OpenOrders";
import Searchcrypto from "../components/SearchCrypto";

import MyChart from "../components/chart/MyChart";

import { useIdentityContext } from "react-netlify-identity";

const Dashboard = () => {
  const { isLoggedIn } = useIdentityContext();

  return (
    <div className="ui container segment">
      <div className="ui grid">
        <div className="six wide column">
          <Searchcrypto />
          <SymbolStream />

          {isLoggedIn ? (
            <div className="ui segment" style={{ height: "215px" }}>
              <BuySell />
            </div>
          ) : (
            "Log in to to be able to trade on your Binance account"
          )}
        </div>

        <div
          id="chartID"
          className="ten wide column"
          style={{ height: "412px" }}
        >
          <MyChart />
        </div>

        {isLoggedIn ? (
          <div className="sixteen wide column">
            <div className="ui segment">
              <OpenOrders />
            </div>
            <div className="ui segment">
              <EventStream />
            </div>
          </div>
        ) : (
          "Log in to see Orders and Events related to your Binance account."
        )}

        <div className="sixteen wide column">
          <div className="ui segment"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
