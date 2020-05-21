import React, { Component } from "react";
import TokenService from "../../services/token-service";

import UnauthenticatedApp from "../UnauthenticatedApp/UnauthenticatedApp";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";
import Nav from "../Nav/Nav";
// import TokenService from "../../services/token-service";

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
          <Nav isLoggedIn={this.state.isLoggedIn} />
          {this.state.isLoggedIn ? <AuthenticatedApp history={this.props.history} setLoggedIn={this.setLoggedIn} /> : <UnauthenticatedApp history={this.props.history} setLoggedIn={this.setLoggedIn} />}
        </main>
    );
  }
}

export default withRouter(App);