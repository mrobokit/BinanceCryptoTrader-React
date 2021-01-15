import React, { useEffect, useState } from "react";
import { formatDate } from "../helpers/general";

import { connect } from "react-redux";
import { activeOrder, cancelOrder } from "../actions";

import "./ActiveOrders.css";

const ActiveOrders = ({ symbol, activeOrder, cancelOrder, order }) => {
  useEffect(() => {
    console.log("From Active Orders", "Render");
    activeOrder(symbol);
  }, [order.BUY, order.CANCEL_ORDER]); // Rerender, and perform the activeOrder request whenever one of these 2 occur :)

  const list = order.ACTIVE_ORDER?.map(
    // LET THE ?. in place otherwise i am screwed
    ({ time, type, symbol, origQty, side, executedQty, orderId, price }) => {
      return (
        <tr key={orderId} data-bound={symbol}>
          <td data-label="Date">
            <div>{formatDate(time)}</div>
          </td>
          <td data-label="Type/Side">
            <div>
              {side} {type}
            </div>
          </td>
          <td data-label="Pair">
            <div>
              <span
                style={{ marginRight: "5px" }}
                className="iconify"
                data-icon={`cryptocurrency:${symbol
                  .substring(0, 3)
                  .toLowerCase()}`}
                data-inline="false"
              ></span>
              {symbol.substring(0, 3)}
            </div>
          </td>
          <td data-label="Price">
            <div>{parseFloat(price)}</div>
          </td>
          <td data-label="Ammount">
            <div>{parseFloat(origQty).toFixed(3)}</div>
          </td>
          <td data-label="Filled">
            <div>{parseFloat(executedQty).toFixed(3)}</div>
          </td>
          <td data-label="Total">
            <span>
              {parseFloat(origQty * price).toFixed(2)}{" "}
              {symbol.slice(symbol.length - 4)}
            </span>
          </td>
          <td data-label="Action">
            <div>
              <button
                className="ui button yellow mr"
                onClick={() => cancelOrder(orderId, symbol)}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      );
    }
  );

  return (
    <div>
      <div className="ui header">
        Open Orders (
        {order.ACTIVE_ORDER ? (
          <span>{order.ACTIVE_ORDER.length}</span>
        ) : (
          <span>0</span>
        )}
        )
      </div>

      <div>
        {order.ACTIVE_ORDER ? (
          <table
            className="ui selectable celled table"
            style={{ maxWidth: "300px" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Type/Side</th>
                <th>Pair</th>
                <th>Price</th>
                <th>Ammount</th>
                <th>Filled</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps, { activeOrder, cancelOrder })(
  ActiveOrders
);
