import React from "react";
import { useSelector } from "react-redux";
import ServerSideWallet from "../components/server/ServerSideWallet";
import { useIdentityContext } from "react-netlify-identity";

const AccountPage = () => {
  const { isLoggedIn } = useIdentityContext();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* {console.log(config)} */}
          <div className="ui header">Wallet</div>
          <ServerSideWallet />
        </div>
      ) : (
        "Please log in first."
      )}
    </div>
  );
};

export default AccountPage;
