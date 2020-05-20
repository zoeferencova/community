import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";

import HomePage from "../../routes/HomePage/HomePage";
import AccountPage from "../../routes/AccountPage/AccountPage";
import MessagePage from "../../routes/MessagePage/MessagePage";
import LocationPage from "../../routes/LocationPage/LocationPage";
import PostDetailPage from "../../routes/PostDetailPage/PostDetailPage";
import NewPostPage from "../../routes/NewPostPage/NewPostPage";
import MyPostPage from "../../routes/MyPostPage/MyPostPage";
import EditPostPage from "../../routes/EditPostPage/EditPostPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import ChangePasswordPage from "../../routes/ChangePasswordPage/ChangePasswordPage";

export default class AuthenticatedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_posts: [],
      neighborhood_posts: [],
      addNewPost: this.addNewPost,
      updateUser: this.updateUser,
    }
  }

  componentDidMount() {
    UserDataService.getUser()
      .then(user => {
        this.setState({ user })

        if (user.location && user.radius) {
          UserDataService.getPosts()
            .then(posts => {
              const user_posts = posts.filter(post => post.user_id === user.id)
              const neighborhood_posts = posts.filter(post => post.user_id !== user.id)
              this.setState({ user_posts, neighborhood_posts })
            })
        }
      })
  }

  addNewPost = post => {
    this.setState({ user_posts: [...this.state.user_posts, post] })
  }

  updateUser = updateValues => {
    this.setState({ user: {...this.state.user, ...updateValues} })
  }

  //Setting context values using AuthenticatedApp's states, providing those context values to all children
  render() {
    const value = { ...this.state }

    return ( 
      <CommUnityContext.Provider value={value}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/account" component={() => <AccountPage setLoggedIn={this.props.setLoggedIn} />} />
            <Route path="/change-password" component={ChangePasswordPage} />
            <Route path="/messages" component={MessagePage} />
            <Route path="/location" component={LocationPage} />
            <Route path="/post/:id" component={PostDetailPage} />
            <Route path="/new-post/:type" component={NewPostPage} />
            <Route path="/my-post/:id" component={MyPostPage} />
            <Route path="/edit-post/:id" component={EditPostPage} />
            <Route component={NotFoundPage} />
          </Switch>
      </CommUnityContext.Provider>
    );
  }
}