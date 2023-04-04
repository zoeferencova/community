import React, { useState } from "react";
import TokenService from "../../services/token-service";

import UnauthenticatedApp from "../UnauthenticatedApp/UnauthenticatedApp";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";

import "./App.css"

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(TokenService.hasAuthToken())

  return (
    <main className="App">
      {/* Renders the authenticated app if user is logged in and renders the unauthenticated app if not */}
      {isLoggedIn ?
        <AuthenticatedApp setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
        :
        <UnauthenticatedApp setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
      }
    </main>
  );

}

export default App;