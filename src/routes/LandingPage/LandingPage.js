import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import AuthApiService from "../../services/auth-api-service";
import { ButtonDark, ButtonLight, lockSquareIcon, eyeSquareIcon, mobileSquareIcon, githubIcon, linkedinIcon, locationSquareIcon, postSquareIcon, messageSquareIcon } from "../../components/Utils/Utils"

import styles from "./LandingPage.module.css";

const LandingPage = ({ setLoggedIn }) => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Logs in "demo user" basically just passing in login information to avoid the need for demo login info to be entered manually
    const demoLogin = () => {
        setLoading(true)
        AuthApiService.postLogin({ email: "demo@email.com", password: "DemoPass33!" })
            .then(res => {
                setLoading(false)
                setLoggedIn(true)
                navigate("/home")
            })
    }

    const demoButton = <ButtonLight large="true" onClick={() => demoLogin()} loading={loading.toString()}>See a demo</ButtonLight>
    const signupButton = <ButtonDark large="true" type="button" onClick={() => navigate("/register")}>Get started</ButtonDark>

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <h1 className={styles.heading}>Coming together in a time of need</h1>
                    <p className={styles.subheading}>Inspired by acts of kindness during Covid lockdown, CommUnity is a platform that allows neighbors to help each other out and share resources.</p>
                    <div className={styles.buttonSection}>
                        {signupButton}
                        {demoButton}
                    </div>
                </div>
                <div className={styles.right}>
                    <img className={`${styles.banner} ${styles.desktop}`} src={require("../../images/banner.jpeg")} alt="grocery delivery" />
                    <img className={`${styles.bannerIcon} ${styles.heart}`} src={require("../../images/banner-heart.png")} alt="offer icon" />
                    <img className={`${styles.bannerIcon} ${styles.question}`} src={require("../../images/banner-question.png")} alt="request icon" />
                </div>
            </header>
            <section className={`${styles.section} ${styles.first}`}>

                <div className={styles.left}>
                    <img className={styles.mockup} src={require("../../images/home-page.png")} alt="mockup of application on desktop browser" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.heading}>How it works</h2>
                    <ul className={styles.featureList}>
                        <li>{locationSquareIcon} Set your location and radius. The radius captures the offers and requests in that area.</li>
                        <li>{postSquareIcon} Create a posting or browse offers and requests from other users in your area.</li>
                        <li>{messageSquareIcon} Respond to requests or accept help and work out the details in an in-app private chat.</li>
                    </ul>
                    <div className={styles.button}>
                        <ButtonDark large="true" onClick={() => demoLogin()} loading={loading.toString()}>See a demo</ButtonDark>
                    </div>
                </div>
            </section>
            <section className={`${styles.section} ${styles.security}`}>
                <div className={styles.top}>
                    <h2 className={styles.heading}>Simple and secure interface</h2>
                    <p className={styles.subheading}>Works on desktop and mobile browsers</p>
                </div>
                <div className={styles.securityDetails}>
                    <div className={styles.left}>
                        <div className={styles.mockupSection}>
                            <img className={styles.mockup} src={require("../../images/chat.png")} alt="mockup of chat functionality" />
                            <img className={styles.mockup} src={require("../../images/location.png")} alt="mockup of location detail page on a mobile device" />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <ul className={styles.featureList}>
                            <li>{eyeSquareIcon} Other users will only see your first name and radius, not your exact location.</li>
                            <li>{lockSquareIcon} Discuss logistics in a private chat and only share what you're comfortable with. </li>
                            <li>{mobileSquareIcon} Mobile version makes it easy to get and give help on the go.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className={`${styles.section} ${styles.last}`}>
                <h2 className={styles.heading}>Ready to make a difference in your community?</h2>
                <div className={styles.buttonSection}>
                    {signupButton}
                    {demoButton}
                </div>
            </section>
            <footer className={styles.footer}>
                <div className={styles.footerDetails}>
                    <p>Made by Zoe Ferencova</p>
                    <a href="https://github.com/zoeferencova/" target="_blank" rel="noopener noreferrer">{githubIcon}</a>
                    <a href="https://www.linkedin.com/in/zoeferencova/" target="_blank" rel="noopener noreferrer">{linkedinIcon}</a>
                </div>
            </footer>
        </main>
    )
}

export default LandingPage;

LandingPage.propTypes = {
    setLoggedIn: PropTypes.func
}