import React from "react";
import { useSelector } from "react-redux";
import Wallet from "../components/Wallet";

const AccountPage = () => {
  const balance = useSelector((state) => state.wallet.balance);
  const config = useSelector((state) => state.config);

  return (
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
  );
};

export default AccountPage;
