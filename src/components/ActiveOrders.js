import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../helpers/general";
import { useDispatch } from "react-redux";
import { activeOrder, cancelOrder } from "../actions";
import "./ActiveOrders.css";

const ActiveOrders = ({ pair, executionReport, ACTIVE_ORDER }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // console.log(pair);
    setHeight(ref.current.clientHeight);
    //console.log(height);
    console.log("From Active Order", "Render");
    dispatch(activeOrder(pair));
  }, []);

  const list = ACTIVE_ORDER?.map(
    // LET THE ?. in place otherwise i am screwed
    ({ time, type, symbol, origQty, side, executedQty, orderId, price }) => {
      return (
        <tr key={orderId} data-bound={pair}>
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
                data-icon={`cryptocurrency:${symbol.toLowerCase()}`}
                data-inline="false"
              ></span>
              {pair.substring(0, 3)}
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
              {pair.slice(pair.length - 4)}
            </span>
          </td>
          <td data-label="Action">
            <div>
              <button
                className="ui button yellow mr"
                onClick={() => dispatch(cancelOrder(orderId, pair))}
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
    <div ref={ref}>
      <div className="ui header">
        Open Orders (
        {ACTIVE_ORDER ? <span>{ACTIVE_ORDER.length}</span> : <span>0</span>})
      </div>
      {list ? (
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
        <div
          className="ui segment"
          style={{
            height: height + "px",
          }}
        >
          <div className="ui active loader"></div>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default ActiveOrders;
