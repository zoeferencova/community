import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthApiService from "../../services/auth-api-service";
import styles from "../LoginPage/LoginPage.module.css";

export default class RegistrationPage extends Component {
    state = {
        loading: false,
        error: null
    }

    // Displays error if password and confirm_password don't match
    // Otherwise submits post request to post new user to server
    // Pushes location to login page and passes success prop to display success message on login form
    register = (first_name, email, password, confirm_password) => {
        this.setState({...this.state, loading: true });
        password !== confirm_password
            ? this.setState({ error: "Passwords do not match", loading: false })
            : AuthApiService.postUser({
                first_name: first_name,
                email: email,
                password: password
            })
                .then(user => {
                    this.setState({...this.state, loading: false });
                    this.props.history.push({
                        pathname: "/login",
                        success: true
                    });
                })
                .catch(res => 
                    this.setState({ error: res.error, loading: false })
                )

    }
    
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Sign up</h1>
                    <div className={styles.form}>
                        <RegistrationForm loading={this.state.loading} error={this.state.error} register={this.register} updateSuccess={this.props.updateSuccess} />
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </div>     
            </div>
        )
    }
}