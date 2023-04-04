import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLight, ButtonDark, Input, Label, Error } from "../Utils/Utils";
import styles from "../LoginForm/LoginForm.module.css"

const RegistrationForm = ({ register, error, loading }) => {
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    // Handles form submission and passes form values to RegistrationPage component's register function
    const handleSubmit = e => {
        e.preventDefault();
        register(firstName, email, password, confirmPassword);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            {error && <Error message={error} />}
            <Label htmlFor="first_name">First name</Label>
            <Input required type="text" name="first_name" id="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <Label htmlFor="email">Email</Label>
            <Input required type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Label htmlFor="password">Password</Label>
            <Input required type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input required type="password" name="confirm_password" id="confirm_password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <div className={styles.buttonContainer}>
                <ButtonLight type="button" onClick={() => navigate("/")}>Cancel</ButtonLight>
                <ButtonDark type="submit" className={styles.registerButton} loading={loading.toString()}>Create account</ButtonDark>
            </div>

        </form>
    )
}

export default RegistrationForm;