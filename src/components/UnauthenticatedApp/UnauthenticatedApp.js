import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import DeactivationSuccessPage from "../../routes/DeactivationSuccessPage/DeactivationSuccessPage";

export default class UnauthenticatedApp extends Component {
  render() {
    return ( 
        <main>
          <Nav isLoggedIn={this.props.isLoggedIn} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={() => <LoginPage setLoggedIn={this.props.setLoggedIn} />} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/deactivated" component={DeactivationSuccessPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
    );
  }
}