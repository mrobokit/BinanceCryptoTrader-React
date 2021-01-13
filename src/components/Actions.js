import React from "react";
import RangeSlider from "./RangeSlider";

export const Actions = ({ coinTwo }) => {
  if (coinTwo.p) {
    return (
      <div className="ui grid">
        <div className="twelve wide column ml">
          <div className="ui mini labeled input m-tb ">
            <div className="ui label">Price</div>
            <input
              type="text"
              value={parseFloat(coinTwo.p)}
              onChange={() => null}
            />
          </div>
          <RangeSlider />
          <br />
          <button className="ui button negative">Buy</button>
          <button className="ui button positive">Sell</button>
          <div className="ui checkbox ">
            <input type="checkbox" name="example" defaultChecked />
            <label>Stop loss</label>
          </div>
        </div>
        <div className="four wide column"></div>
      </div>
    );
  }

  return <div>Loading...</div>; // have a spinner instead or smthing :)
};
