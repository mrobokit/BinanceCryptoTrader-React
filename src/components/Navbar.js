import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link className="item" to="/">
        Dashboard
      </Link>
      <Link className="item" to="/account">
        Wallet
      </Link>

      <div className="right menu">
        <Link className="ui item" to="/">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
