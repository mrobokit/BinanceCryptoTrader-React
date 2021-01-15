import React, { useEffect, useState } from "react";
import { formatDate } from "../helpers/general";
import Actions from "./Actions";

const ActiveOrders = ({ symbol }) => {
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    // fetchOrder("openOrders", symbol, setOpenOrders);
  }, []);

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

            <button
              className="ui button yellow mr"
              // onClick={() => cancelOrder(orderId, symbol, setOpenOrders)}
            >
              Cancel
            </button>
          </div>
        );
      }
    }
  );

  return (
    <div>
      <Actions symbol={symbol} />

      <div className="ui header">
        Open Orders (
        {openOrders.length ? <span>{openOrders.length}</span> : <span>0</span>})
      </div>

      <div> {list}</div>
    </div>
  );
};

export default ActiveOrders;
