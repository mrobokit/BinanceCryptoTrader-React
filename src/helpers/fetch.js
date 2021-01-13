import CryptoJS from "crypto-js";

export const fetchOrders = async (endpoint, setter, symbol) => {
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
    `https://api.binance.com/api/v3/${endpoint}?${query}&signature=${hash}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setter(result);
      //console.log(result);
    })
    .catch((error) => console.log("error", error));
};
