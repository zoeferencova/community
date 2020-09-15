import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "../LoginPage/LoginPage.module.css";

export default class RegistrationPage extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Sign up</h1>
                    <div className={styles.form}>
                        <RegistrationForm />
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </div>     
            </div>
        )
    }
}