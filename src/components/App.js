import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import AccountPage from "../pages/AccountPage";
// import SymbolPage from "../pages/SymbolPage";
import SettingsPage from "../pages/SettingsPage";

import "../css/App.css";

//react-netlify-identity-widget
import {
  IdentityContextProvider,
  useIdentityContext,
} from "react-netlify-identity";

import { GlobalStyles } from "../components";
import { CreateAccount, LogIn, Welcome } from "../views";

const PublicRoute = (props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Redirect to="/dashboard" /> : <Route {...props} />;
};

const PrivateRoute = (props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/welcome" />;
};

const App = () => {
  const url = "https://cryptotradingtools.netlify.app";

  if (!url)
    throw new Error(
      "process.env.REACT_APP_NETLIFY_IDENTITY_URL is blank2, which means you probably forgot to set it in your Netlify environment variables"
    );
  return (
    <>
      <GlobalStyles />
      <IdentityContextProvider url={url}>
        <BrowserRouter>
          <Switch>
            <div className="ui container container-style hundredvh">
              <Navbar />

              {/* //This is the default entry point, defined in PrivateRoute */}
              <PublicRoute exact path="/" component={Welcome} />
              <PublicRoute path="/welcome" component={Welcome} />

              <PublicRoute path="/createaccount" component={CreateAccount} />
              <PublicRoute path="/login" component={LogIn} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/wallet" component={AccountPage} />
              <PrivateRoute path="/settings" component={SettingsPage} />
              {/* />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/account" exact component={AccountPage} />
              <Route path="/trade/:pair" component={SymbolPage} />
              <Route path="/settings" component={SettingsPage} /> */}
            </div>
          </Switch>
        </BrowserRouter>
      </IdentityContextProvider>
    </>
  );
};

export default App;
