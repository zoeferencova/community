import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthApiService from "../../services/auth-api-service";

import styles from "./LoginPage.module.css";

const LoginPage = ({ setLoggedIn }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { success } = useLocation()
    const navigate = useNavigate()

    // Submits post request to server to log user in
    // Pushes user's location to the location page if it is their first login and no locaiton is set, otherwise pushes to home page
    const logIn = (email, password) => {
        setLoading(true);

        AuthApiService.postLogin({
            email, password
        })
            .then(user => {
                setLoading(false)
                setLoggedIn(true)
                !user.location ? navigate("/location") : navigate("/home");
            })
            .catch(res => {
                setLoading(false);
                setError(res.error);
            })
    }


    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>Sign in</h1>
                <div className={styles.form}>
                    <LoginForm logIn={logIn} loading={loading} error={error} success={success} />
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>
        </div>

    )

}

export default LoginPage;

LoginPage.propTypes = {
    setLoggedIn: PropTypes.func
}