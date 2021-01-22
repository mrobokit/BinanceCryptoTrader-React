import React from "react";
import { useIdentityContext } from "react-netlify-identity";

import { Logo, StyledButton } from "./ButtonGoogle.styles";
import { googleLogo } from "../../assets";

export const ButtonGoogle = (props) => {
  const { loginProvider } = useIdentityContext();

  const logInWithGoogle = () => {
    loginProvider("google");
  };

  return (
    <StyledButton onClick={logInWithGoogle}>
      <Logo src={googleLogo} />
      {props.children}
    </StyledButton>
  );
};
