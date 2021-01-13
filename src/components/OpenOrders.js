import React from "react";

const OpenOrders = (symbol) => {
    const [account, setAccount] = useState([]);
    const timestamp = `timestamp=${Date.now()}`;
    const secretKey = process.env.REACT_APP_API_SECRET;
    const hash = CryptoJS.HmacSHA256(timestamp, secretKey);

    const axiosOpenOrders = () => {
        const response = await binance.get(
            `/account?${timestamp}&signature=${hash}`
          );
          //console.log(JSON.stringify(response.data.balances)); // To have it return a string, like fetch does above
          setAccount(response.data.balances);
    }

    
  return <div className="ui header"> Open Orders</div>;
};

export default OpenOrders;
