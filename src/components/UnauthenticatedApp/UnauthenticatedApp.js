import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { PropTypes } from 'prop-types';
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import DeactivationSuccessPage from "../../routes/DeactivationSuccessPage/DeactivationSuccessPage";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import styles from "./UnauthenticatedApp.module.css";

export default class UnauthenticatedApp extends Component {
  render() {
    return ( 
        <main className={styles.main}>
          <Nav isLoggedIn={this.props.isLoggedIn} />
          <ErrorBoundary key={window.location.pathname}>
            <Switch>
              <Route exact path="/"  component={() => <LandingPage setLoggedIn={this.props.setLoggedIn} isLoggedIn={this.props.isLoggedIn} />}  />
              <Route path="/login" component={() => <LoginPage setLoggedIn={this.props.setLoggedIn} isLoggedIn={this.props.isLoggedIn} />} />
              <Route path="/register" component={RegistrationPage} />
              <Route path="/deactivated" component={DeactivationSuccessPage} />
              <Route component={() => <NotFoundPage isLoggedIn={this.props.isLoggedIn} />} />
            </Switch>
          </ErrorBoundary>
        </main>
    );
  }
}

UnauthenticatedApp.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}