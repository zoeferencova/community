import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { ButtonLight, ButtonDark, Input, Label, Error, Success } from "../Utils/Utils";

import styles from "./LoginForm.module.css";

class LoginForm extends Component {
    state = { 
        email: "",
        password: "",
    }

    // Handles form submission and calls LoginPage's logIn function with supplied email and password
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        this.props.logIn(email, password);
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)} className={styles.form}>
                {this.props.success && <Success message="Account created. Please sign in." />}         
                {this.props.error !== null && <Error message={this.props.error} />}       
                <Label htmlFor="email">Email</Label>
                <Input required type="text" name="email" id="email" value={this.state.email} onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password" id="password" value={this.state.password} onChange={e => this.setState({ ...this.state, password: e.target.value })} />
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/")}>Cancel</ButtonLight>
                    <ButtonDark type="submit" loading={this.props.loading.toString()}>Sign in</ButtonDark>
                </div>             
            </form>
        )
    }
}

export default withRouter(LoginForm)

LoginForm.propTypes = {
    logIn: PropTypes.func,
    loading: PropTypes.bool
}