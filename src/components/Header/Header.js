import React from "react";

import { FixedBar, Title } from "./Header.styles";
import { Container } from "..";

export const Header = (props) => {
  if (props.name) {
    return (
      <FixedBar>
        <Container row between>
          <Title>{props.name}</Title>
        </Container>
      </FixedBar>
    );
  } else {
    return (
      <FixedBar>
        <Container row between>
          <Title>Home</Title>
        </Container>
      </FixedBar>
    );
  }
};
