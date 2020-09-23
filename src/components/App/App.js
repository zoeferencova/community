import React, { Component } from "react";
import TokenService from "../../services/token-service";

import UnauthenticatedApp from "../UnauthenticatedApp/UnauthenticatedApp";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";

import "./App.css"
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    isLoggedIn: TokenService.hasAuthToken() ? true : false,
  }

  setLoggedIn = (status) => {
    this.setState({ isLoggedIn: status })
  }

  render() {
    return ( 
        <main className="App">
          {this.state.isLoggedIn ? <AuthenticatedApp history={this.props.history} setLoggedIn={this.setLoggedIn} isLoggedIn={this.state.isLoggedIn} /> : <UnauthenticatedApp history={this.props.history} setLoggedIn={this.setLoggedIn} isLoggedIn={this.state.isLoggedIn} />}
        </main>
    );
  }
}

export default withRouter(App);