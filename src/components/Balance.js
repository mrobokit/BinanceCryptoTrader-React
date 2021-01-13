import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

// api/v3/account?${parameters}&signature=${hash}
// You need to hash using CryptoJS.HmacSHA256 the parameters string together with secret key e.g const hash = CryptoJS.HmacSHA256(parameters, secretKey) then pass the hash together with params
// you need to have the chrome extension Allow Cors : Access Control Allow Origin turned ON
// You need import CryptoJS from "crypto-js";
// Same thing, getting the balance, both with axios and fetch ( axios much more sleek)

const Balance = () => {
  const [account, setAccount] = useState([]);
  const timestamp = `timestamp=${Date.now()}`;
  const secretKey = process.env.REACT_APP_API_SECRET;
  const hash = CryptoJS.HmacSHA256(timestamp, secretKey);

  const fetchAccount = async () => {
    var myHeaders = new Headers();
    myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.binance.com/api/v3/account?${timestamp}&signature=${hash}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const axiosAccount = async (term) => {
    const response = await binance.get(
      `/account?${timestamp}&signature=${hash}`
    );
    //console.log(JSON.stringify(response.data.balances)); // To have it return a string, like fetch does above
    setAccount(response.data.balances);
  };

  const list = account.map((acc) => {
    if (acc.free > 0) {
      return (
        <tr key={acc.asset} data-bound={acc.asset}>
          <td data-label="Name">
            <div>
              {/*  These come from iconify*/}
              <span
                style={{ marginRight: "5px" }}
                className="iconify"
                data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
                data-inline="false"
              ></span>
              {acc.asset}
            </div>
          </td>
          <td data-label="Ammount">
            <div>{acc.free}</div>
          </td>
        </tr>
      );
    }
  });

  useEffect(() => {
    axiosAccount();
  }, []);

  return (
    <table className="ui selectable celled table" style={{ maxWidth: "300px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ammount</th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </table>
  );
};

export default Balance;
