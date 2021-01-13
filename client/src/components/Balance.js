import React, { useEffect, useState } from "react";
import binance from "../components/api/binance";

const Balance = () => {
  const [data, setData] = useState([]);

  const search = async () => {
    const response = await binance.get("/ticker/price?symbol=ETHUSDT"); // means i get the data property from the response
    console.log(response);
    setData(response);
  };

  useEffect(() => {
    search();
  }, []);

  return <div>KDOOO</div>;
};

export default Balance;
