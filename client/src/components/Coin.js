import React from "react";
import "./Coin.css";

const num = (string) => {
  return parseInt(string).toFixed(2);
};

const float = (string) => {
  return parseFloat(string).toFixed(2);
};

export const CoinPair = ({ pair }) => {
  return <div>{pair}</div>;
};

export const CoinPrice = ({ price }) => {
  return <div>{num(price)}</div>;
};

export const Change24H = ({ price, percentage }) => {
  if (num(price) >= 0) {
    return (
      <div>
        <span className={"ui green label"}>+{float(percentage)}%</span>
        {/* <sup className="ui green">+{num(price)}</sup> */}
      </div>
    );
  }

  return (
    <div>
      <span>{float(percentage)}%</span>
      {/* <sup>{num(price)}</sup> */}
    </div>
  );
};
