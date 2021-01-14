import React, { useEffect, useState } from "react";
import { tradeOrder } from "../helpers/fetch";

const Actions = ({ symbol, onActionPerformed }) => {
  const [buySellPrice, setBuySellPrice] = useState("");
  const [quantity, setQuantity] = useState(0.01);
  const [actionPerformed, setActionPerformed] = useState([]);

  useEffect(() => {
    onActionPerformed(actionPerformed);
  }, []);

  if (symbol) {
    return (
      <div className="ui grid">
        <div className="twelve wide column ml">
          <div className="ui  labeled input m-tb ">
            <div className="ui label">PRI</div>
            <input
              type="text"
              value={buySellPrice}
              onChange={(e) => setBuySellPrice(e.target.value)}
            />
          </div>
          {/* <RangeSlider onChangeSetQuantity={handler} /> */}
          <div className="ui  labeled input m-tb ">
            <div className="ui label">QTY</div>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br />
          <button
            className="ui button negative mr"
            onClick={() =>
              tradeOrder(
                "BUY",
                symbol,
                quantity,
                buySellPrice,
                setActionPerformed
              )
            }
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
        <div className="four wide column">{}</div>
      </div>
    );
  }

  return <div>Loading...</div>; // have a spinner instead or smthing :)
};

export default Actions;
