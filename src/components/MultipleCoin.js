import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import "../css/Coin.css";
import Placeholder from "./semantic/Placeholder";

export const CoinPair = ({ data }) => {
  //This doesn't need to be rerendered, the only reason i let it
  // Is to be 100% this is the trade name it is coming from
  // console.log(data);
  const qr = data + "usdt";
  // console.log(qr);
  // console.log(qr);

  const trade = useSelector((state) => state.tradeStream[qr], shallowEqual); //state.tradeStream[qr] very important square bracket notation

  if (trade && trade !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return <div>{trade?.s}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

export const CoinPrice = ({ data }) => {
  const qr = data + "usdt";

  const trade = useSelector((state) => state.tradeStream[qr], shallowEqual);

  if (trade && trade !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return <div> {parseFloat(trade?.p)}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

export const Change24H = ({ data }) => {
  const qr = data + "usdt";
  const ticker = useSelector((state) => state.tickerStream[qr], shallowEqual);

  //Running & Disconnected & Loading State
  if (ticker && ticker !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return (
      <div>
        <h2 className={`ui sub header m-tb ${ticker?.p > 0 ? "green" : "red"}`}>
          <span>{parseFloat(ticker?.p).toFixed(2)} </span>&#32; /
          {parseFloat(ticker?.P).toFixed(2)}%
        </h2>
      </div>
    );
  } else {
    //Loading state
    return <Placeholder />;
  }
};
