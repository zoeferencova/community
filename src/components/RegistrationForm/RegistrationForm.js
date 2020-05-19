import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthApiService from "../../services/auth-api-service";

class RegistrationForm extends Component {    
    state = { error: null };
    
    handleSubmit = e => {
        e.preventDefault();
        const { first_name, email, password, confirm_password } = e.target;
        console.log(first_name.value)
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
                <div role="alert">
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
                <div>
                    <label htmlFor="first_name">First name</label>
                    <input required type="text" name="first_name" id="first_name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input required type="password" name="confirm_password" id="confirm_password" />
                </div>
                <Link to="/"><button>Cancel</button></Link>
                <button type="submit">Create Account</button>
            </form>
        )
    }
}

export default withRouter(RegistrationForm)