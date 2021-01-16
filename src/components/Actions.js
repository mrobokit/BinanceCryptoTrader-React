import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tradeOrder } from "../actions";

const Actions = ({ symbol }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Action", "Render");
  }, []);

  if (symbol) {
    return (
      <div className="ui grid">
        <div className="seven wide column ml">
          <div className="ui header"> Actions </div>
          <div className="ui  labeled input m-tb ">
            <div className="ui label">PRI</div>
            <input type="text" value={"900"} />
          </div>
          {/* <RangeSlider onChangeSetQuantity={handler} /> */}
          <div className="ui  labeled input m-tb ">
            <div className="ui label">QTY</div>
            <input
              type="text"
              value={"0.12"}
              // onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br />
          <button
            className="ui button negative mr"
            onClick={() => dispatch(tradeOrder("BUY", symbol, "0.12", "900"))} // DONT foRGET PROPS PFFF
          >
            Buy
          </button>
          <br /> <br />
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
        <div className="four wide column"></div>
      </div>
    );
  }

  return <div>Loading...</div>; // have a spinner instead or smthing :)
};

export default Actions;
