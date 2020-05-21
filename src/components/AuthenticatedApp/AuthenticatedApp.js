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
import DeactivationConfirmationPage from "../../routes/DeactivationConfirmationPage/DeactivationConfirmationPage";

export default class AuthenticatedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_posts: [],
      neighborhood_posts: [],
      getAllPosts: this.getAllPosts,
      addNewPost: this.addNewPost,
      updatePost: this.updatePost,
      removePost: this.removePost,
      updateUser: this.updateUser,
    }
  }

  componentDidMount() {
    UserDataService.getUser()
      .then(user => {
        this.setState({ user })

        if (user.location && user.radius) {
          this.getAllPosts(user.id)
        }
      })
  }

  getAllPosts = userId => {
    UserDataService.getPosts()
      .then(posts => {
        const user_posts = posts.filter(post => post.user_id === userId)
        const neighborhood_posts = posts.filter(post => post.user_id !== userId)
        this.setState({ user_posts, neighborhood_posts })
      })
  }

  addNewPost = post => {
    this.setState({ user_posts: [...this.state.user_posts, post] })
  }

  updatePost = updatedPost => {
    const newPosts = this.state.user_posts.map(post => {
      return post.id === updatedPost.id ? updatedPost : post
    })
    this.setState({ user_posts: newPosts })
  }

  removePost = postId => {
    const newPosts = this.state.user_posts.filter(post => Number(postId) !== Number(post.id))
    this.setState({ user_posts: newPosts })
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
            <Route path="/location" component={() => <LocationPage location={this.state.user.location} radius={this.state.user.radius} history={this.props.history} />} />
            <Route path="/post/:id" component={PostDetailPage} />
            <Route path="/new-post/:type" component={NewPostPage} />
            <Route path="/my-post/:id" component={MyPostPage} />
            <Route path="/edit-post/:id" component={EditPostPage} />
            <Route path="/confirm-deactivation" component={() => <DeactivationConfirmationPage setLoggedIn={this.props.setLoggedIn} />} />
            <Route component={NotFoundPage} />
          </Switch>
      </CommUnityContext.Provider>
    );
  }
}