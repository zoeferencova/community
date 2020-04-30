import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegistrationForm extends Component {    
    handleSubmit() {
        this.props.history.push("/login")
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="first-name">First name</label>
                    <input required type="text" name="first-name" id="first-name" />
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
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input required type="password" name="confirm-password" id="confirm-password" />
                </div>
                <Link to="/"><button>Cancel</button></Link>
                <button type="submit">Create Account</button>
            </form>
        )
    }
}