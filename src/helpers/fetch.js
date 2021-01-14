import CryptoJS from "crypto-js";

export const fetchOrder = async (endpoint, symbol, setter = null) => {
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
      setter(result); //crucial for rerendering
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const tradeOrder = async (
  side,
  symbol,
  qt,
  price,
  setter,
  type = "LIMIT"
) => {
  const query = `symbol=${symbol}&side=${side}&type=${type}&quantity=${qt}&price=${price}&timeInForce=GTC&timestamp=${Date.now()}`;
  const secretKey = process.env.REACT_APP_API_SECRET;
  const hash = CryptoJS.HmacSHA256(query, secretKey);

  const myHeaders = new Headers();
  myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.binance.com/api/v3/order?${query}&signature=${hash}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //perform event and pass the info
      setter(result);
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const cancelOrder = async (orderId, symbol, setter = null) => {
  const query = `symbol=${symbol}&orderId=${orderId}&timestamp=${Date.now()}`;
  const secretKey = process.env.REACT_APP_API_SECRET;
  const hash = CryptoJS.HmacSHA256(query, secretKey);

  const myHeaders = new Headers();
  myHeaders.append("X-MBX-APIKEY", `${process.env.REACT_APP_API_KEY}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.binance.com/api/v3/order?${query}&signature=${hash}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //setter(result);
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};

//cancelOrder
//Cancel All Open Orders on a Symbol (TRADE)
