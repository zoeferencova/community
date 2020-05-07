import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// import styles from "./LoginForm.module.css";

class LoginForm extends Component {
    logIn() {
        this.props.toggleLogin();
        this.props.history.push("/location");
    }
    
    render() {
        return (
            <form onSubmit={() => this.logIn()}>
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