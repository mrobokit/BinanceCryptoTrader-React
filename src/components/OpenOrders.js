import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { activeOrder, cancelOrder } from "../actions";
import "../css/OpenOrders.css";
import Placeholder2 from "../components/semantic/Placeholder2";

const OpenOrders = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config, shallowEqual);
  const eventStream = useSelector(
    (state) => state.eventStream.executionReport,
    shallowEqual
  );
  const order = useSelector((state) => state.order.activeOrder, shallowEqual);

  const formatDate = (string) => {
    var options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  useEffect(
    () => {
      dispatch(activeOrder(config.pair));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eventStream, config.symbol]
  );

  const list = order?.map(
    // LET THE ?. in place otherwise i am screwed
    ({ time, type, origQty, side, executedQty, orderId, price }) => {
      return (
        <tr key={orderId} data-bound={config.pair}>
          <td data-label="Date">
            <div>{formatDate(time)}</div>
          </td>
          <td data-label="Type/Side">
            <h5
              className={`ui tiny header ${type === "BUY" ? "red " : "green"}`}
            >
              {" "}
              {side} {type}
            </h5>
          </td>
          <td data-label="Pair">
            <div>
              <span
                style={{ marginRight: "5px" }}
                className="iconify"
                data-icon={`cryptocurrency:${config.symbol.toLowerCase()}`}
                data-inline="true"
              ></span>
              {config.pair.substring(0, 3)}
            </div>
          </td>
          <td data-label="Price">
            <div className="ui tag label">
              {parseFloat(price)} <span>{config.fiat}</span>
            </div>
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
              {config.pair.slice(config.pair.length - 4)}
            </span>
          </td>
          <td data-label="Action">
            <div>
              <button
                className="ui button yellow mr"
                onClick={() => dispatch(cancelOrder(orderId, config.pair))}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      );
    }
  );

  if (order && order !== null) {
    return (
      <div>
        <div className="ui header">
          Open Orders ({order ? <span>{order.length}</span> : <span>0</span>})
        </div>
        <table
          className="ui selectable collapsing celled table"
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
      </div>
    );
  } else {
    return <Placeholder2 />;
  }
};

export default OpenOrders;
