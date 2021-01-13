import React from "react";
import RangeSlider from "./RangeSlider";

export const Actions = ({ coinTwo }) => {
  return (
    <div className="ui grid">
      <div class="twelve wide column">
        <div className="ui mini labeled input m-tb ml">
          <div className="ui label">Price</div>
          <input type="text" value={parseFloat(coinTwo.p)} />
        </div>
        <RangeSlider />
        <br />
        <button className="ui button negative ml">Buy</button>
        <button className="ui button positive ml">Sell</button>
        <div class="ui checkbox ml">
          <input type="checkbox" name="example" checked />
          <label>Stop loss</label>
        </div>
      </div>
      <div className="four wide column"></div>
    </div>
  );
};
