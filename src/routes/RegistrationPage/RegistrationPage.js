import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Container } from "../../components/Utils/Utils";
import AuthApiService from "../../services/auth-api-service";
import styles from "../LoginPage/LoginPage.module.css";

const RegistrationPage = updateSuccess => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Displays error if password and confirm_password don't match
    // Otherwise submits post request to post new user to server
    // Pushes location to login page and passes success prop to display success message on login form
    const register = (first_name, email, password, confirm_password) => {
        setLoading(true)
        if (password !== confirm_password) {
            setError('Passwords do not match')
            setLoading(false)
        } else {
            AuthApiService.postUser({
                first_name: first_name,
                email: email,
                password: password
            })
                .then(user => {
                    setLoading(false)
                    navigate('/login', { success: true })
                })
                .catch(res => {
                    setError(res.error)
                    setLoading(false)
                })
        }
    }

    return (
        <Container authForm="true">
            <div className={styles.form}>
                <h1>Sign up</h1>
                <RegistrationForm loading={loading} error={error} register={register} updateSuccess={updateSuccess} />
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
        </Container>
    )

}

export default RegistrationPage;