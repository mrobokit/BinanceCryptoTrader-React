import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tradeOrder } from "../actions";

//Put wallet usdt and symbol here too, above buy sell, like Binance
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
          <div Name="inline" style={{ minWidth: "250px" }}>
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

// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchWallet } from "../actions";

// const Wallet = ({ BALANCE, executionReport, symbol, fiat }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("From Wallet", "Render");
//     dispatch(fetchWallet());
//   }, [executionReport]);

//   const renderList = BALANCE?.map((acc) => {
//     if (
//       (acc && acc.free > 0 && acc.asset === symbol?.replace(fiat, "")) ||
//       acc.asset === fiat
//     ) {
//       return (
//         <tr key={acc.asset} data-bound={acc.asset}>
//           <td data-label="Name">
//             <div>
//               <span
//                 style={{ marginRight: "5px" }}
//                 className="iconify"
//                 data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
//                 data-inline="false"
//               ></span>
//               {acc.asset}
//             </div>
//           </td>
//           <td data-label="Ammount">
//             <div>{acc.free}</div>
//           </td>
//           <td data-label="Locked">
//             {acc.locked > 0 ? (
//               <div>{parseFloat(acc.locked).toFixed(2)}</div>
//             ) : (
//               <div>N/A</div>
//             )}
//           </td>
//         </tr>
//       );
//     }

//     return null;
//   });

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
