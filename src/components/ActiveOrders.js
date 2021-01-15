import React, { useEffect, useState } from "react";
import { formatDate } from "../helpers/general";
import Actions from "./Actions";
import { connect } from "react-redux";
import { activeOrder } from "../actions";

const ActiveOrders = ({ symbol, activeOrder, order }) => {
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    activeOrder(symbol);
  }, []); // when order changes, rerender!

  const list = order.ACTIVE_ORDER.map(
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
        {order.ACTIVE_ORDER.length ? (
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

export default connect(mapStateToProps, { activeOrder })(ActiveOrders);
