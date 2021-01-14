import React, { useEffect, useState } from "react";
import { fetchOrder, tradeOrder, cancelOrder } from "../helpers/fetch";
import { formatDate } from "../helpers/general";
import Actions from "./Actions";
// import RangeSlider from "./RangeSlider";

// export const OrderHistory = ({ symbol }) => {
//   const [allOrders, setAllOrders] = useState([]);

//   const run = () => {
//     fetchOrder("allOrders", setAllOrders, symbol);
//   };

//   const orders = allOrders.map(
//     ({
//       time,
//       type,
//       symbol,
//       origQty,
//       side,
//       executedQty,
//       orderId,
//       price,
//       status,
//     }) => {
//       if (orderId) {
//         return (
//           <div key={orderId}>
//             <span> {formatDate(time)}</span>

//             <span className="m-lr"> {status}</span>

//             {side === "BUY" ? (
//               <span className={`ui red sub header m-lr`}>
//                 {side} {type}
//               </span>
//             ) : (
//               <span className={`ui  green sub header m-lr`}>
//                 {side} {type}
//               </span>
//             )}

//             <span className="m-lr"> {symbol}</span>
//             <span className="m-lr">
//               {executedQty}/ {origQty}
//             </span>

//             <span className="m-lr">
//               {parseFloat(price)} {symbol.slice(symbol.length - 4)}
//             </span>
//           </div>
//         );
//       }

//       return "";
//     }
//   );

//   return (
//     <div>
//       <div className="ui header"> Order History</div>
//       <button onClick={run}>Run</button>
//       <button
//         className="ml"
//         onClick={() =>
//           (document.getElementById("orders").style.display = "none")
//         }
//       >
//         Hide
//       </button>
//       <button
//         className="ml"
//         onClick={() =>
//           (document.getElementById("orders").style.display = "block")
//         }
//       >
//         Show
//       </button>
//       <div id="orders">{orders}</div>
//     </div>
//   );
// };

export const OpenOrders = ({ symbol }) => {
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    const run = async () => {
      const result = await fetchOrder("openOrders", symbol);
      console.log(result);
    };

    run();
  }, []);

  useEffect(() => {
    console.log(`Rerendered, fetching orders API for symbol ${symbol} ...`);
  }, [openOrders]);

  const notifyMe = (data) => {
    setOpenOrders(data);
  };

  const list = openOrders.map(
    ({ time, type, symbol, origQty, side, executedQty, orderId, price }) => {
      if (orderId) {
        return (
          <div key={orderId}>
            <span> {formatDate(time)}</span>

            <span className="ui green sub header m-lr">
              {side} {type}
            </span>

            <span className="m-lr"> {symbol}</span>
            <span className="m-lr">
              {executedQty}/ {origQty}
            </span>

            <span className="m-lr">
              {parseFloat(price)} {symbol.slice(symbol.length - 4)}
            </span>

            <button
              className="ui button yellow mr"
              onClick={() => cancelOrder(orderId, symbol, setOpenOrders)}
            >
              Cancel
            </button>
          </div>
        );
      }
    }
  );
  return (
    <div>
      <Actions symbol={symbol} />

      <div className="ui header">
        Open Orders (
        {openOrders.length ? <span>{openOrders.length}</span> : <span>0</span>})
      </div>

      <div> {list}</div>
    </div>
  );
};
