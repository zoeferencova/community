import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthApiService from "../../services/auth-api-service";

import styles from "./LoginPage.module.css";

class LoginPage extends Component {
    state = {
        loading: false,
        error: null
    }

    logIn = (email, password) => {
        this.setState({...this.state, loading: true })

        AuthApiService.postLogin({
            email, password
        })
            .then(user => {
                this.setState({...this.state, loading: false })
                this.props.setLoggedIn(true)
                !user.location ? this.props.history.push("/location") : this.props.history.push("/home");
            })
            .catch(res => {
                this.setState({ loading: false, error: res.error })
            })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Sign in</h1>
                    <div className={styles.form}>
                        <LoginForm logIn={this.logIn} loading={this.state.loading} error={this.state.error} success={this.props.location.success} />
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            </div>   
            
        )
    }
}

export default withRouter(LoginPage)

LoginPage.propTypes = {
    setLoggedIn: PropTypes.func
}