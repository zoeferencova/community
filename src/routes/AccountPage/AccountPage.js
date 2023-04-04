import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserDataService from "../../services/user-data-service";
import AuthApiService from "../../services/auth-api-service";
import CommUnityContext from "../../contexts/context";
import styles from "./AccountPage.module.css"
import { Input, Label, ProfilePicture, ButtonDark, ButtonLight, Error, Success } from "../../components/Utils/Utils";

const AccountPage = ({ success }) => {
    const communityContext = useContext(CommUnityContext);

    const [firstName, setFirstName] = useState(communityContext.user.first_name);
    const [email, setEmail] = useState(communityContext.user.email);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Calls logout function in context
    const handleLogout = e => {
        e.preventDefault();
        communityContext.logout();
    }

    // Handles form submission, updating the user's name and email information in state
    // Sends patch request to server to update user information
    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        const userInfo = { firstName, email };
        const userId = communityContext.user.id;

        // Updates JWT token if user email changes
        if (email !== communityContext.user.email) {
            AuthApiService.updateAuthToken({ email, userId })
        }

        UserDataService.patchUser(userInfo, userId)
            .then(res => {
                setLoading(false)
                communityContext.updateUser(userInfo)
            })
            .catch(res => {
                setError(res.error)
                setLoading(false)
            })
    }

    return (
        <main className={styles.main}>
            <button className={styles.backButton} type="button" onClick={() => navigate("/home")}><i className="fas fa-arrow-left"></i></button>
            {communityContext.user.first_name &&
                <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                    <ProfilePicture className={styles.profPic} first_name={communityContext.user.first_name} />

                    {error && <Error message={error} />}
                    {success && <Success message={success} />}

                    <Label htmlFor="first_name">First Name</Label>
                    <Input required type="text" name="first_name" id="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <div className={styles.buttonContainer}>
                        <ButtonLight className={styles.logoutButton} type="button" onClick={handleLogout}>Log out</ButtonLight>
                        <ButtonDark type="submit" loading={loading.toString()}>Update</ButtonDark>
                    </div>

                    <div className={styles.links}>
                        <Link to="/change-password"><i className="fas fa-key"></i> Change password</Link>
                        <Link to="/location"><i className="fas fa-map-marker-alt"></i> Change location</Link>
                        <Link to="/confirm-deactivation"><i className="fas fa-ban"></i> Deactivate account</Link>
                    </div>
                </form>
            }
        </main>
    )
}

export default AccountPage;