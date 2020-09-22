import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight, ButtonDark, Input, Label, Error } from "../Utils/Utils";
import styles from "../LoginForm/LoginForm.module.css"

import AuthApiService from "../../services/auth-api-service";

class RegistrationForm extends Component {    
    state = { error: null };
    
    handleSubmit = e => {
        e.preventDefault();
        const { first_name, email, password, confirm_password } = e.target;
        password.value !== confirm_password.value
            ? this.setState({ error: "Passwords do not match" })
            : AuthApiService.postUser({
                first_name: first_name.value,
                email: email.value,
                password: password.value
            })
                .then(user => {
                    first_name.value = "";
                    email.value = "";
                    password.value = "";
                    confirm_password.value = "";
                    this.props.history.push("/login");
                })
                .catch(res => 
                    this.setState({ error: res.error })
                )
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                {this.state.error && <Error message={this.state.error} />}                
                <Label htmlFor="first_name">First name</Label>
                <Input required type="text" name="first_name" id="first_name" />
                <Label htmlFor="email">Email</Label>
                <Input required type="email" name="email" id="email" />
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password" id="password" />
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input required type="password" name="confirm_password" id="confirm_password" />
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/")}>Cancel</ButtonLight>
                    <ButtonDark type="submit">Create Account</ButtonDark>
                </div>
                
            </form>
        )
    }
}

export default withRouter(RegistrationForm)