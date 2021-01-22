import React from "react";
import { Link } from "react-router-dom";
import { useIdentityContext } from "react-netlify-identity";
import { Redirect } from "react-router-dom";

import styled from "styled-components";
import { Button } from "../components/Button/Button.styles";

const Navbar = () => {
  const { user, logoutUser, isLoggedIn } = useIdentityContext();

  const logOut = () => {
    logoutUser();
    <Redirect to="/" />;
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="ui secondary pointing menu" style={{ border: "none" }}>
          <Link className="item" to="/dashboard">
            Dashboard
          </Link>
          <Link className="item" to="/wallet">
            Wallet
          </Link>

          <div className="right menu">
            <div className="ui item"> Hi, {JSON.stringify(user?.email)}</div>

            <div className="ui item">
              <LogOutButton secondary onClick={logOut}>
                Log out
              </LogOutButton>
            </div>

            <Link className="ui item" to="/settings">
              <LogOutButton secondary>Settings</LogOutButton>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const LogOutButton = styled(Button)`
  color: var(--color-error);
  max-height: 20px;
  max-width: 50px;
`;

export default Navbar;
