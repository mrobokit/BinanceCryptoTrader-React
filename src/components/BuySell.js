import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tradeOrder, fetchWallet } from "../actions";

import "./BuySell.css";

//Put wallet usdt and symbol here too, above buy sell, like Binance
const Actions = ({ trade, symbol, fiat, pair, balance }) => {
  const [buyPrice, setBuyPrice] = useState(850);
  const [buyQuantity, setBuyQuantity] = useState(0.12);
  const [sellPrice, setSellPrice] = useState(850);
  const [sellQuantity, setSellQuantity] = useState(0.12);
  const dispatch = useDispatch();

  const report = useSelector((state) => state.report);
  const execution = report.executionReport;

  useEffect(() => {
    dispatch(fetchWallet());
  }, [execution, dispatch]);

  const symbolBalance = balance?.map((acc) => {
    if (acc.asset === symbol) {
      return (
        <div className="inline" key={acc.asset}>
          Available <span>{parseFloat(acc.free)}</span>
          <span
            style={{ marginRight: "5px" }}
            className="iconify"
            data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
            data-inline="false"
          ></span>
          {acc.asset}
        </div>
      );
    }

    return null;
  });

  const fiatBalance = balance?.map((acc) => {
    if (acc.asset === fiat) {
      return (
        <div className="inline" key={acc.asset}>
          Available <span>{parseFloat(acc.free)}</span>
          <span
            style={{ marginRight: "5px" }}
            className="iconify"
            data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
            data-inline="false"
          ></span>
          {acc.asset}
        </div>
      );
    }

    return null;
  });

  if (trade) {
    return (
      <>
        <div className="ui  mini labeled input m-tb buySell">
          <div className="ui label">{`Price (${fiat})`}</div>
          <input
            type="text"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </div>
        <br />
        <div className="ui  mini labeled input m-tb buySell">
          <div className="ui label">{`Amount (${symbol})`}</div>
          <input
            type="text"
            value={buyQuantity}
            onChange={(e) => setBuyQuantity(e.target.value)}
          />
        </div>
        <br />
        {fiatBalance}
        <div className="inline" style={{ minWidth: "250px" }}>
          <button
            className="ui button positive mr "
            onClick={() =>
              dispatch(tradeOrder("BUY", pair, buyQuantity, buyPrice))
            }
          >
            Buy
          </button>
        </div>
        <br />
        {/*  Sell  */}
        <div className="ui mini labeled input m-tb buySell">
          <div className="ui label">PRI</div>
          <input
            type="text"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />
        </div>
        <br />
        <div className="ui mini labeled input m-tb buySell">
          <div className="ui label">QTY</div>
          <input
            type="text"
            value={sellQuantity}
            onChange={(e) => setSellQuantity(e.target.value)}
          />
        </div>
        <br />
        {symbolBalance}
        <div className="inline" style={{ minWidth: "250px" }}>
          <button
            className="ui button negative mr "
            onClick={() =>
              dispatch(tradeOrder("SELL", pair, sellQuantity, sellPrice))
            }
          >
            Sell
          </button>
        </div>
        <br /> <br />
        {/* Extra Options */}
        <div className="ui checkbox">
          <input type="checkbox" name="stopLoss" />
          <label>Stop loss</label>
        </div>
        <br />
        <div className="ui checkbox ">
          <input type="checkbox" name="currentPrice" />
          <label>Current price</label>
        </div>
      </>
    );
  }

  return <div>Loading...</div>; // have a spinner instead or smthing :)
};

export default Actions;

//   return (
//     <div>
//       {BALANCE && symbol ? (
//         <table
//           className="ui selectable celled table"
//           style={{ maxWidth: "300px" }}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Ammount</th>
//               <th>Locked</th>
//             </tr>
//           </thead>
//           <tbody>{renderList}</tbody>
//         </table>
//       ) : (
//         <div
//           className="ui segment"
//           style={{ minHeight: "300px", maxWidth: "265px" }}
//         >
//           <div className="ui active loader"></div>
//           <p></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wallet;
