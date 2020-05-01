import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import STORE from "../../STORE";

import HomePage from "../../routes/HomePage/HomePage";
import AccountPage from "../../routes/AccountPage/AccountPage";
import MessagePage from "../../routes/MessagePage/MessagePage";
import LocationPage from "../../routes/LocationPage/LocationPage";
import OfferPage from "../../routes/OfferPage/OfferPage";
import RequestPage from "../../routes/RequestPage/RequestPage";
import NewOfferPage from "../../routes/NewOfferPage/NewOfferPage";
import NewRequestPage from "../../routes/NewRequestPage/NewRequestPage";
import MyPostPage from "../../routes/MyPostPage/MyPostPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";

export default class AuthenticatedApp extends Component {
    state = {
        users: STORE.users,
        posts: STORE.posts,
        currentUser: STORE.users[2],
    }

  //Setting context values using AuthenticatedApp's states, providing those context values to all children
  render() {
    const value = { ...this.state }

    return ( 
      <CommUnityContext.Provider value={value}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/messages" component={MessagePage} />
            <Route path="/location" component={LocationPage} />
            <Route path="/offer/:id" component={OfferPage} />
            <Route path="/request/:id" component={RequestPage} />
            <Route path="/new-offer" component={NewOfferPage} />
            <Route path="/new-request" component={NewRequestPage} />
            <Route path="/my-post/:id" component={MyPostPage} />
            <Route component={NotFoundPage} />
          </Switch>
      </CommUnityContext.Provider>
    );
  }
}