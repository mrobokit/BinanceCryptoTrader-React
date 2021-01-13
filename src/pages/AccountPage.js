import Balance from "../components/Balance";
import React from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  return (
    <div>
      <div className="ui header">Wallet</div>
      <Link to="/">Go back</Link>
      <Balance />
    </div>
  );
};

export default AccountPage;
