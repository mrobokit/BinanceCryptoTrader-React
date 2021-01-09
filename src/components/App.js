import React, { useState, useEffect } from "react";
import binance from "../components/api/binance";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function search() {
      const response = await binance.get("/time"); // means i get the data property from the response
      console.log(response);
      //setData(response);
    }

    search();
  }, []);

  return <div className="ui container">{}</div>;
};

export default App;

//create dropdown - on dropdown, populate it with all cryptocurrencies
