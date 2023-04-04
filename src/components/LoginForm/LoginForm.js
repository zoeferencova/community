import React, { useState } from "react";
import { PropTypes } from 'prop-types';
import { ButtonLight, ButtonDark, Input, Label, Error, Success } from "../Utils/Utils";

import styles from "./LoginForm.module.css";

const LoginForm = ({ logIn, error, success, loading }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Handles form submission and calls LoginPage's logIn function with supplied email and password
    const handleSubmit = e => {
        e.preventDefault();
        logIn(email, password);
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
            {success && <Success message="Account created. Please sign in." />}
            {error !== null && <Error message={error} />}
            <Label htmlFor="email">Email</Label>
            <Input required type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Label htmlFor="password">Password</Label>
            <Input required type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className={styles.buttonContainer}>
                <ButtonLight type="button" onClick={() => window.history.push("/")}>Cancel</ButtonLight>
                <ButtonDark type="submit" loading={loading.toString()}>Sign in</ButtonDark>
            </div>
        </form>
    )
}

export default LoginForm;

LoginForm.propTypes = {
    logIn: PropTypes.func,
    loading: PropTypes.bool
}