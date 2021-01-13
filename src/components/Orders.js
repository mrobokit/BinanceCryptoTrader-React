import React, { useEffect, useState } from "react";
import { fetchOrders } from "../helpers/fetch";
import { formatDate } from "../helpers/general";

export const AllOrders = ({ symbol }) => {
  const [allOrders, setAllOrders] = useState([]);

  const run = () => {
    fetchOrders("allOrders", setAllOrders, symbol);
  };

  const orders = allOrders.map(
    ({
      time,
      type,
      symbol,
      origQty,
      side,
      executedQty,
      orderId,
      price,
      status,
    }) => {
      if (orderId) {
        return (
          <div key={orderId}>
            <span> {formatDate(time)}</span>

            <span className="m-lr"> {status}</span>

            {side === "BUY" ? (
              <span className={`ui red sub header m-lr`}>
                {side} {type}
              </span>
            ) : (
              <span className={`ui  green sub header m-lr`}>
                {side} {type}
              </span>
            )}

            <span className="m-lr"> {symbol}</span>
            <span className="m-lr">
              {executedQty}/ {origQty}
            </span>

            <span className="m-lr">
              {parseFloat(price)} {symbol.slice(symbol.length - 4)}
            </span>
          </div>
        );
      }

      return "";
    }
  );

  return (
    <div>
      <div> Order History</div>
      <button onClick={run}>Show</button>
      <div>{orders}</div>
    </div>
  );
};

export const OpenOrders = ({ symbol }) => {
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    fetchOrders("openOrders", setOpenOrders, symbol);
  }, [symbol]);

  const list = openOrders.map(
    ({ time, type, symbol, origQty, side, executedQty, orderId, price }) => {
      if (orderId) {
        return (
          <div key={orderId}>
            <span> {formatDate(time)}</span>

            <span className="ui green sub header m-lr">
              {side} {type}
            </span>

            <span className="m-lr"> {symbol}</span>
            <span className="m-lr">
              {executedQty}/ {origQty}
            </span>

            <span className="m-lr">
              {parseFloat(price)} {symbol.slice(symbol.length - 4)}
            </span>

            <button className="ui right item info">Cancel</button>
          </div>
        );
      }

      return "";
    }
  );

  return (
    <div>
      <div className="ui header">
        Open Orders (
        {openOrders.length ? (
          <span>{openOrders.length}</span>
        ) : (
          <span className="ui mini active inline loader"></span>
        )}
        )
      </div>

      <div> {list}</div>
    </div>
  );
};
