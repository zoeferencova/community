import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

import styles from "./LoginPage.module.css";

export default class LoginPage extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Sign in</h1>
                    <div className={styles.form}>
                        <LoginForm setLoggedIn={this.props.setLoggedIn} />
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            </div>   
            
        )
    }
}