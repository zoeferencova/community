import React, { Component } from "react";
import UnauthenticatedApp from "../UnauthenticatedApp/UnauthenticatedApp";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";
import Nav from "../Nav/Nav"
// import TokenService from "../../services/token-service";

import "./App.css"

export default class App extends Component {
  state = {
      // isLoggedIn: TokenService.hasAuthToken() ? true : false,
      isLoggedIn: false
  }

  //Passed as a prop to AuthenticatedApp and UnauthenticatedApp
  //Sets isLoggedIn state to true or false which conditionally renders the Authenticated and Unauthenticated App components based on whether an Auth Token is present
  toggleLogin = () => {
    this.state.isLoggedIn ? this.setState({ isLoggedIn: false }) : this.setState({ isLoggedIn: true });
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAP_API_KEY}&libraries=places`
    window.document.body.appendChild(googleMapScript);
  }

  render() {
    return ( 
        <main className="App">
          <Nav isLoggedIn={this.state.isLoggedIn} />
          {this.state.isLoggedIn ? <AuthenticatedApp toggleLogin={this.toggleLogin} /> : <UnauthenticatedApp toggleLogin={this.toggleLogin} />}
        </main>
    );
  }
}