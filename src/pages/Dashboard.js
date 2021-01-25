import React from "react";
import SymbolStream from "../components/SymbolStream";
import BuySell from "../components/BuySell";
import EventStream from "../components/EventStream";
import OpenOrders from "../components/OpenOrders";
import Searchcrypto from "../components/SearchCrypto";

import MyChart from "../components/chart/MyChart";

import { useIdentityContext } from "react-netlify-identity";

const Dashboard = () => {
  const savedApiKeys = null;
  const { isLoggedIn } = useIdentityContext();

  //FAUNA DB RELATED

  // Function using fetch to POST to our API endpoint
  return (
    <div className="ui container segment">
      <div className="ui grid">
        <div className="six wide column">
          {/* DELETED ME AFTER BEING DONE */}

          <Searchcrypto />
          <SymbolStream />
        </div>

        <div
          id="chartID"
          className="ten wide column"
          style={{ height: "412px" }}
        >
          <MyChart />
        </div>

        {isLoggedIn && savedApiKeys ? (
          <div data-di="protected-bi-api-calls">
            <div className="ui segment" style={{ height: "215px" }}>
              <div className="ui segment">
                <BuySell />
              </div>
              <div className="ui segment">
                <OpenOrders />
              </div>
              <div className="ui segment">
                <EventStream />
              </div>
            </div>
          </div>
        ) : (
          "Save your API keys in order to be able to trade."
        )}
      </div>
    </div>
  );
};

export default Dashboard;
