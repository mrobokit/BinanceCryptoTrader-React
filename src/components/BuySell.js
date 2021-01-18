import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tradeOrder } from "../actions";

const Actions = ({ symbol }) => {
  const dispatch = useDispatch();
  const [buySellPrice, setBuySellPrice] = useState(850);
  const [quantity, setQuantity] = useState(0.12);

  useEffect(() => {
    // console.log("Action", "Render");
  }, []);

  if (symbol) {
    return (
      <div className="ui grid">
        <div className="seven wide column">
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
          <div class="inline" style={{ minWidth: "250px" }}>
            <button
              className="ui button negative mr "
              onClick={() =>
                dispatch(tradeOrder("BUY", symbol, quantity, buySellPrice))
              } // DONT foRGET PROPS PFFF
            >
              Buy
            </button>
            <button
              className="ui button positive mr "
              onClick={() =>
                dispatch(tradeOrder("BUY", symbol, quantity, buySellPrice))
              } // DONT foRGET PROPS PFFF
            >
              Sell
            </button>
          </div>
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
