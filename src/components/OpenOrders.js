import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const OpenOrders = ({ symbol }) => {
  const [openOrders, setOpenOrders] = useState("");

  useEffect(() => {
    const fetchOpenOrders = async () => {
      const query = `symbol=${symbol}&timestamp=${Date.now()}`;
      const secretKey = process.env.REACT_APP_API_SECRET;
      const hash = CryptoJS.HmacSHA256(query, secretKey);

      const myHeaders = new Headers();
      myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://api.binance.com/api/v3/openOrders?${query}&signature=${hash}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setOpenOrders(result);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    };

    fetchOpenOrders();
  }, [symbol]);

  return (
    <div>
      <div className="ui header">
        Open Orders (
        {openOrders.length ? (
          <span>{openOrders.length}</span>
        ) : (
          <span className="ui mini active inline loader"></span>
        )}
        )
      </div>
    </div>
  );
};

export default OpenOrders;
