import React from "react";
import { useNavigate } from "react-router-dom";

import { ButtonDark } from "../../components/Utils/Utils";

import styles from "./DeactivationSuccessPage.module.css";

const DeactivationSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            <h3>Your account has been successfully deactivated</h3>
            <ButtonDark onClick={() => navigate("/")}>Go to Home Page</ButtonDark>
        </div>
    )
}

export default DeactivationSuccessPage;