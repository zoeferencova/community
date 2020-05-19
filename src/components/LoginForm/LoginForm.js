import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";

// import styles from "./LoginForm.module.css";

class LoginForm extends Component {
    state = { error: null }

    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = "";
                password.value = "";
                this.props.history.push("/home")
            })
            .then(res => this.props.setLoggedIn(true))
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="text" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" />
                </div>
                <Link to="/"><button>Cancel</button></Link>
                <button type="submit">Sign in</button>
            </form>
        )
    }
}

export default withRouter(LoginForm)