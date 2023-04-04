import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight } from "../../components/Utils/Utils";
import styles from "./DeactivationConfirmationPage.module.css";
import UserDataService from "../../services/user-data-service";
import TokenService from "../../services/token-service";

const DeactivationConfirmationPage = ({ setLoggedIn }) => {
    const communityContext = useContext(CommUnityContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Deactivates user by sending delete request to server
    // Clears auth token and logs user out 
    // Pushes location to the deactivation success page
    const handleDeactivation = () => {
        setLoading(true)
        const userId = communityContext.user.id;
        UserDataService.deleteUser(userId)
            .then(res => {
                TokenService.clearAuthToken();
                setLoading(false)
                setLoggedIn(false);
                navigate("/deactivated");
            })
    }

    return (
        <div className={styles.main}>
            <h3>Deactivate Account</h3>
            <div className={styles.inner}>
                <h4>We're sad to see you go <span role="img" aria-label="sad face emoji">😔</span>. Are you sure you want to deactivate your account?</h4>
                <div className={styles.buttonSection}>
                    <ButtonDark type="button" onClick={() => navigate("/account")}>Nevermind!</ButtonDark>
                    <ButtonLight className={styles.yesButton} type="submit" onClick={handleDeactivation} loading={loading.toString()}>Yes</ButtonLight>
                </div>
            </div>
        </div>
    )
}

export default DeactivationConfirmationPage;

DeactivationConfirmationPage.propTypes = {
    setLoggedIn: PropTypes.func
}