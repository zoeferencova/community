import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { PropTypes } from 'prop-types';
import io from "socket.io-client";
import jstz from "jstimezonedetect";
import config from "../../config";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import ChatService from "../../services/chat-service";
import TokenService from "../../services/token-service";
import { USER_CONNECTED, LOGOUT, PRIVATE_MESSAGE, NEW_CHAT, CHAT_TO_REMOVE } from "../../message-utils/events";

import Nav from "../Nav/Nav"
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
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

import styles from "./AuthenticatedApp.module.css";

export default class AuthenticatedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_posts: [],
      neighborhood_posts: [],
      chats: [],
      socket: null,
      activeChat: null,
      timeZone: null,
      getAllPosts: this.getAllPosts,
      addNewPost: this.addNewPost,
      updatePost: this.updatePost,
      removePost: this.removePost,
      updateUser: this.updateUser,
      addNewMessage: this.addNewMessage,
      addNewChat: this.addNewChat,
      removeChat: this.removeChat,
      updateActiveChat: this.updateActiveChat,
      updateSuccessMessage: this.updateSuccessMessage,
      logout: this.logout,
      loading: true,
      success: null
    }
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    
    const tz = jstz.determine().name();
    this.setState({ timeZone: tz });

    UserDataService.getUser()
      .then(user => {
        this.setState({ user })

        this.initSocket()

        if (user.location && parseInt(user.radius) !== 0) {
          this.getAllPosts(user.id)
        }
      })

    ChatService.getUserChats()
      .then(chats => this.setState({ chats }))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initSocket = () => {
    const socket = io(config.SOCKET_URL)
    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("reconnect", () => {
      socket.emit(USER_CONNECTED, this.state.user)
      
      ChatService.getUserChats()
        .then(chats => {
          if (this.state.activeChat) {
            const currentChat = this.state.chats.find(chat => chat.id === this.state.activeChat.id)
            const activeChat = chats.find(chat => chat.id === this.state.activeChat.id)
            if (activeChat.messages.length > currentChat.messages.length) {
              this.setState({ chats, activeChat })
            }
          } else {
            this.setState({ chats })
          }
        })
    })

    socket.emit(USER_CONNECTED, this.state.user);
    socket.on(PRIVATE_MESSAGE, message => this.addNewMessage(message, message.chat_id))
    socket.on(NEW_CHAT, chat => this.addNewChat(chat))
    socket.on(CHAT_TO_REMOVE, chatId => this.removeChat(chatId))
    this.setState({ socket })
  }

  getAllPosts = userId => {
    this.state.user.location && this.state.user.radius && UserDataService.getPosts()
      .then(posts => {
        const user_posts = posts.filter(post => post.user_id === userId)
        const neighborhood_posts = posts.filter(post => post.user_id !== userId)
        this.setState({ user_posts, neighborhood_posts })
        this.setState({ loading: false })
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
    this.setState({ ...this.state, user: {...this.state.user, ...updateValues} })
    this.updateSuccessMessage("Account information updated")
  }

  addNewMessage = (message, chatId) => {
    const chat = this.state.chats.find(chat => chat.id === chatId)
    const filteredChats = this.state.chats.filter(chat => chat.id !== chatId)
    const newChat = chat.messages ? { ...chat, messages: [...chat.messages, message]} : {...chat, messages: [message]}
    const newChats = chat.messages ? [newChat, ...filteredChats] : [newChat, ...filteredChats]
    this._isMounted && this.setState({ chats: newChats })
    if (this.state.activeChat) {
      this._isMounted && (message.sender_id === this.state.user.id || this.state.activeChat.id === newChat.id) && this.setState({ activeChat: newChat })
    }
  }

  addNewChat = chat => {
    this.setState({ chats: [...this.state.chats, chat], activeChat: chat })
  }

  removeChat = chatId => {
    const newChats = this.state.chats.filter(chat => Number(chatId) !== Number(chat.id))
    this.setState({ chats: newChats })
    this.setState({ activeChat: null })
  }

  updateActiveChat = chatId => {
    if (chatId === null) {
      this.setState({ activeChat: null })
    } else {
      const chat = this.state.chats.find(chat => chat.id === chatId)
      this.setState({ activeChat: chat })
    }
  }

  updateSuccessMessage = message => {
    this.setState({ success: message })
  }

  logout = () => {
    const { socket } = this.state;
    socket && socket.emit(LOGOUT);

    TokenService.clearAuthToken();
    this.props.setLoggedIn(false);
    this.props.history.push("/");
  }

  //Setting context values using AuthenticatedApp's states, providing those context values to all children
  render() {
    const value = { ...this.state }
    return ( 
      <main >
        <CommUnityContext.Provider value={value} >
          <div className={styles.main}>
            {this.state.user.first_name && <Nav isLoggedIn={this.props.isLoggedIn} first_name={this.state.user.first_name} />}
            <ErrorBoundary key={window.location.pathname}>
              <Switch>
                <Route path="/home" component={() => <HomePage loading={this.state.loading} />} />
                <Route path="/account" component={() => <AccountPage setLoggedIn={this.props.setLoggedIn} success={this.state.success} />} />
                <Route path="/change-password" component={ChangePasswordPage} />
                <Route path="/messages" component={() => <MessagePage user={this.state.user} />} />
                {this.state.user.first_name && <Route path="/location" component={() => <LocationPage userLocation={this.state.user.location.lat !== null ? this.state.user.location : { lat: 40.7450271, lng: -73.8858674 } } radius={this.state.user.radius ? parseFloat(this.state.user.radius) : parseFloat(1609.344)} history={this.props.history} />} />}
                <Route path="/post/:id" component={PostDetailPage} />
                <Route path="/new-post/:type" component={NewPostPage} />
                <Route path="/my-post/:id" component={MyPostPage} />
                <Route path="/edit-post/:id" component={EditPostPage} />
                <Route path="/confirm-deactivation" component={() => <DeactivationConfirmationPage setLoggedIn={this.props.setLoggedIn} />} />
                <Route component={() => <NotFoundPage isLoggedIn={this.props.isLoggedIn} />} />
              </Switch>
            </ErrorBoundary>
          </div>
        </CommUnityContext.Provider>
      </main>
    );
  }
}

AuthenticatedApp.propTypes = {
  setLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool
}