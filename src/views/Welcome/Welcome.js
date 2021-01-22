import React from "react";
import { Link } from "react-router-dom";

import { Intro, Layout } from "./Welcome.styles";
import { Button, Container } from "../../components";

export const Welcome = () => {
  return (
    <>
      <Container between partial>
        <Intro>Crypto Trader Tools</Intro>
        <p>
          This is made with: React, Redux, Redux-Thunk, Netlify, Axios,
          Crypto-JS, lightweight-charts and Styled Components.
        </p>
        <Layout>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </Layout>
        <Layout>
          <Link to="/createaccount">
            <Button secondary>Create account</Button>
          </Link>
        </Layout>
      </Container>
    </>
  );
};
