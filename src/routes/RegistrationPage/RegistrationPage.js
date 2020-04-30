import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default class RegistrationPage extends Component {
    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <div>
                    <RegistrationForm />
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        )
    }
}