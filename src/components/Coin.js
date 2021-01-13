import React from "react";
import "./Coin.css";

export const CoinPair = ({ symbol }) => {
  if (symbol) {
    return <div>{symbol}</div>;
  }
  return <div>Loading...</div>;
};

export const CoinPrice = ({ price }) => {
  //Take the price number, create new piece of state as array that stores 30 sec, 1 min, 3 min, 5 min, 30 min worth of data
  // It can then calculate if arrow goes up or down, control when to update on screen, and show by percentage how much it went up or down
  // in those past periods of time.

  if (price) {
    return <div> {parseFloat(price)}</div>;
  }

  return <div>Loading...</div>;
};

export const Change24H = ({ price, percentage }) => {
  if (price && price >= 0) {
    return (
      <div>
        <h2 className="ui green sub header m-tb">
          +{parseFloat(percentage).toFixed(2)}%
        </h2>

        <h2 className="ui green sub header m-tb">
          +{parseFloat(price).toFixed(2)} USDT
        </h2>

        {/* <sup className="ui green">+{num(price)}</sup> */}
      </div>
    );
  } else if (price && price < 0) {
    return (
      <div>
        <h2 className="ui red sub header m-tb">
          {parseFloat(percentage).toFixed(2)}%
        </h2>

        <h2 className="ui red sub header m-tb">
          {parseFloat(price).toFixed(2)} USDT
        </h2>

        {/* <sup>{num(price)}</sup> */}
      </div>
    );
  }

  return <div>Loading...</div>;
};

/* <h2 className="ui sub header m-tb">
          24H Volume
          {parseFloat(baseV)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <br />
          24H Volume (USDT)
          {parseFloat(quoteV)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h2> */

/* {price >= prevPrice ? (
          <div>
            <i className="green arrow up icon"></i>
          </div>
        ) : (
          <div>
            <i className="red arrow down icon"></i>
          </div>
        )} */
