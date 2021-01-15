import React, { useEffect, useState } from "react";
import { formatDate } from "../helpers/general";
import Actions from "./Actions";
import { connect } from "react-redux";
import { activeOrder, cancelOrder } from "../actions";

const ActiveOrders = ({ symbol, activeOrder, cancelOrder, order }) => {
  useEffect(() => {
    activeOrder(symbol);
  }, [order.CANCEL_ORDER, order.BUY]); // Rerender, and perform the activeOrder request whenever one of these 2 occur :)

  const list = order.ACTIVE_ORDER?.map(
    // LET THE ?. in place otherwise i am screwed
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
              onClick={() => cancelOrder(orderId, symbol)}
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
        {order.ACTIVE_ORDER ? (
          <span>{order.ACTIVE_ORDER.length}</span>
        ) : (
          <span>0</span>
        )}
        )
      </div>
      {order.ACTIVE_ORDER ? <div> {list}</div> : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps, { activeOrder, cancelOrder })(
  ActiveOrders
);
