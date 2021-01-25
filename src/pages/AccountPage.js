import React from "react";
import { useSelector } from "react-redux";
import Wallet from "../components/Wallet";
import { useIdentityContext } from "react-netlify-identity";

const AccountPage = () => {
  const balance = useSelector((state) => state.wallet.balance);
  const config = useSelector((state) => state.config);
  const { isLoggedIn } = useIdentityContext();
  const savedApiKeys = null;

  return (
    <div>
      {isLoggedIn && savedApiKeys ? (
        <div>
          {/* {console.log(config)} */}
          <div className="ui header">Wallet</div>
          <Wallet
            balance={balance}
            // executionReport={executionReport}
            symbol={config.symbol}
            fiat={config.fiat}
          />
        </div>
      ) : (
        "Save your API keys in order to be able to see your wallet."
      )}
    </div>
  );
};

export default AccountPage;
