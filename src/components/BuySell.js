import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { tradeOrder, fetchWallet } from "../actions";
import FluidPlaceholder from "./semantic/FluidPlaceholder";

import "../css/BuySell.css";

//Put wallet usdt and symbol here too, above buy sell, like Binance
const Actions = () => {
  // Internal state, needed only here
  const [buyPrice, setBuyPrice] = useState(undefined);
  const [buyQuantity, setBuyQuantity] = useState(undefined);
  const [sellPrice, setSellPrice] = useState(undefined);
  const [sellQuantity, setSellQuantity] = useState(undefined);
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.wallet.balance);
  const config = useSelector((state) => state.config);
  const eventStream = useSelector(
    (state) => state.eventStream.executionReport,
    shallowEqual
  );

  // const execution = report.executionReport;

  useEffect(
    () => {
      dispatch(fetchWallet());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eventStream]
  );

  const symbolBalance = wallet?.map((acc) => {
    if (acc.asset === config.symbol) {
      return (
        <div className="inline" key={acc.asset}>
          <span>{parseFloat(acc.free).toFixed(10)}</span>{" "}
          <span
            style={{ marginRight: "5px" }}
            className="iconify"
            data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
            data-inline="true"
          ></span>
          {acc.asset}
        </div>
      );
    }

    return null;
  });

  const fiatBalance = wallet?.map((acc) => {
    if (acc.asset === config.fiat) {
      return (
        <div className="inline" key={acc.asset}>
          <span>{parseFloat(acc.free)}</span>{" "}
          <span
            style={{ marginRight: "5px" }}
            className="iconify"
            data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
            data-inline="true"
          ></span>
          {acc.asset}
        </div>
      );
    }

    return null;
  });

  if (wallet) {
    return (
      <div className="ui grid">
        <div className="eight wide column">
          <div className="ui  mini labeled input m-tb buySell">
            <div className="ui label myLabel">{`Price (${config.fiat})`}</div>
            <input
              type="text"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>

          <br />
          <div className="ui  mini labeled input m-tb buySell">
            <div className="ui label myLabel">{`Amount (${config.symbol})`}</div>
            <input
              type="text"
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(e.target.value)}
            />
          </div>
          <br />
          {fiatBalance}
          <div className="inline" style={{ minWidth: "250px" }}>
            <button
              className="ui button positive mr "
              onClick={() =>
                dispatch(tradeOrder("BUY", config.pair, buyQuantity, buyPrice))
              }
            >
              Buy
            </button>
          </div>
        </div>

        <div className="eight wide column">
          <div className="ui mini right labeled input m-tb buySell">
            <div className="ui label myLabel">{`Price (${config.fiat})`}</div>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </div>
          <br />
          <div className="ui mini corner labeled input m-tb buySell">
            <div className="ui label myLabel">{`Amount (${config.symbol})`}</div>
            <input
              type="number"
              value={sellQuantity}
              onChange={(e) => setSellQuantity(e.target.value)}
            />
          </div>
          <br />
          {symbolBalance}
          <div className="inline" style={{ minWidth: "250px" }}>
            <button
              className="ui button negative mr "
              onClick={() =>
                dispatch(
                  tradeOrder("SELL", config.pair, sellQuantity, sellPrice)
                )
              }
            >
              Sell
            </button>
          </div>

          {/* Extra Options */}
        </div>
        <div>
          <div className="ui checkbox">
            <input type="checkbox" name="stopLoss" />
            <label>Stop loss</label>
          </div>
          <br />
          <div className="ui checkbox ">
            <input type="checkbox" name="currentPrice" />
            <label>Current price</label>
          </div>
        </div>

        <div className="ui bottom right attached black label">
          {config.pair}
        </div>
      </div>
    );
  }

  return <FluidPlaceholder />;
};

export default Actions;
