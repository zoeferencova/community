import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Input, Label, Error } from "../../components/Utils/Utils";
import styles from "./ChangePasswordPage.module.css";
import UserDataService from "../../services/user-data-service";
import AuthApiService from "../../services/auth-api-service";

const ChangePasswordPage = () => {
    const communityContext = useContext(CommUnityContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handles password form submission
    // Compares new_password value and confirm_password value and returns form error if not matching
    // Checks if old_password value is correct using checkPassword function from the Auth API service and returns form error if not
    // If old password and conirm password check out, patch request is sent to the server for the password
    // Success message passed to context which allows it to be displayed on AccountPage after page is redirected there
    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        const { oldPassword, newPassword, confirmPassword } = e.target;
        const { user } = communityContext;

        if (newPassword.value !== confirmPassword.value) {
            setLoading(false)
            setError("New password and confirm password do not match")
        }

        AuthApiService.checkPassword({ password: oldPassword.value })
            .then(res => {
                if (res.error) {
                    setLoading(false)
                    setError("Old password is incorrect")
                } else {
                    UserDataService.patchUser({ password: newPassword.value }, user.id)
                        .then(res => {
                            setLoading(false)
                            communityContext.updateSuccessMessage("Password successfully updated")
                            navigate("/account")
                        })
                        .catch(res => {
                            setError(res.error)
                            setLoading(false)
                        })
                }
            })
    }

    return (
        <div className={styles.main}>
            <h3>Change Password</h3>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                {error && <Error message={error} className={styles.error} />}
                <div>
                    <Label htmlFor="oldPassword">Old Password</Label>
                    <Input type="password" name="oldPassword" id="oldPassword" />
                </div>
                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input type="password" name="newPassword" id="newPassword" />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword" />
                </div>
                <div className={styles.buttonSection}>
                    <ButtonLight type="button" onClick={() => navigate(-1)}>Cancel</ButtonLight>
                    <ButtonDark type="submit" className={styles.submitButton} loading={loading.toString()}>Change Password</ButtonDark>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordPage;