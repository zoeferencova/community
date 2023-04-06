import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLight } from "../../components/Utils/Utils"
import { PropTypes } from 'prop-types';

import styles from "./NotFoundPage.module.css"

const NotFoundPage = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    // Redirects user to HomePage or LandingPage based on whether or not the user is logged in
    const redirect = () => isLoggedIn ? navigate("/home") : navigate("/");

    return (
        <>
            <div className={(window.location.pathname === "/location" && isLoggedIn) ? styles.hide : styles.notFound}>
                <img src={require("../../images/not-found.png")} alt="Not found error" className={styles.image}></img>
                <h1 className={styles.title}>Sorry, that page couldn't be found</h1>
                <ButtonLight onClick={redirect}>Take me home</ButtonLight>
            </div>
        </>

    )
}

export default NotFoundPage;

NotFoundPage.propTypes = {
    isLoggedIn: PropTypes.bool
}