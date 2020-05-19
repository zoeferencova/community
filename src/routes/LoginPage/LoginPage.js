import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

// import styles from "./LoginPage.module.css";

export default class LoginPage extends Component {
    render() {
        return (   
            <div>
                <h1>Sign in</h1>
                <div>
                    <LoginForm setLoggedIn={this.props.setLoggedIn}  />
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>
        )
    }
}