import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight, ButtonDark } from "../../components/Utils/Utils";

import styles from "./LandingPage.module.css";

class LandingPage extends Component {
    render() {
        return (   
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.left}>
                        <h1 className={styles.heading}>Coming together in a time of need</h1>
                        <p className={styles.subheading}>Right now, more than ever, we need to unite our communities and help those in need. CommUnity is a platform that enables the sharing of services and resources to ensure no one is left stranded during the Coronavirus (COVID-19) outbreak.</p>
                        <div className={styles.buttonSection}>
                            <button className={styles.signupButton} type="button" onClick={() => this.props.history.push("/register")}>Start now</button>
                            <button className={styles.demoButton} type="button" onClick={() => this.props.history.push("/demo")}>See a demo</button>
                        </div> 
                    </div>
                    <div className={styles.right}>
                        <img className={`${styles.banner} ${styles.desktop}`} src={require("../../images/banner.jpeg")} alt="grocery delivery" />
                    </div>
                </header>
                <section className={`${styles.section} ${styles.first}`}>
                    <div className={styles.left}>
                        <h2 className={styles.heading}>How does it work?</h2>
                        <p className={styles.subheading}>Post offers or requests for help and see other active postings in your neighborhood. <br></br><br></br> Other members of your community can then offer to help or accept your offer, initiating a private chat where you can securely work out the details.</p>
                    </div>
                    <div className={styles.right}>
                        <img className={styles.mockupDesktop} src={require("../../images/mockup1.png")} alt="mockup of application on desktop browser" />
                    </div>
                </section>
                <section className={`${styles.section} ${styles.icons}`}>
                    <h2>What our helpers can do for you</h2>
                    <div className={styles.iconList}>
                        <div className={styles.iconSection}>
                            <img className={styles.iconImage} src={require("../../images/supplies.jpg")} alt="man handing supplies to older couple" />
                            <div className={styles.iconColumn}>
                                <h3 className={styles.iconHeading}>Pick up supplies</h3>
                                <p className={styles.iconSubheading}>Running low on groceries, medicine, or household supplies? Our helpers can grab anything you need and drop it off at your doorstep.</p>
                            </div>
                        </div>
                        <div className={styles.iconSection}>
                            <img className={styles.iconImage} src={require("../../images/dog.jpg")} alt="woman walking dog wearing a face mask" />
                            <div className={styles.iconColumn}>
                                <h3 className={styles.iconHeading}>Walk your dog</h3>
                                <p className={styles.iconSubheading}>Our helpers can take your furry friend for a safe stroll if you don’t feel comfortable being out and about.</p>
                            </div>
                        </div>
                        <div className={styles.iconSection}>
                            <img className={styles.iconImage} src={require("../../images/phone.jpg")} alt="woman talking on the phone looking at laptop" />
                            <div className={styles.iconColumn}>
                                <h3 className={styles.iconHeading}>Friendly chat</h3>
                                <p className={styles.iconSubheading}>We know that quarantining can be an isolating and frightening time. Our helpers can offer a friendly chat through our secure instant messaging system.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`${styles.section} ${styles.security}`}>
                    <div className={styles.left}>
                        <img className={styles.securityMockup} src={require("../../images/security-mockups.png")} alt="mockup of chat functionality and post detail page" />
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.heading}>Your safety and security are important to us</h2>
                        <p className={styles.subheading}>We will never share any of your personal information. The other users in your neighborhood will only see your first name and location radius (not your exact location), so the amount of information that you share in the chat is 100% your call.</p>
                    </div>
                </section>
                <section className={`${styles.section} ${styles.last}`}>
                    <h2 className={styles.heading}>Ready to make a difference in your community?</h2>
                    <div className={styles.buttonSection}>
                        <button className={styles.signupButton} type="button" onClick={() => this.props.history.push("/register")}>Start now</button>
                        <button className={styles.demoButton} type="button" onClick={() => this.props.history.push("/demo")}>See a demo</button>
                    </div> 
                </section>
                <footer className={styles.footer}>
                    <div className={styles.footerDetails}>
                        <p>Made by Zoe Ferencova</p>
                        <a href="https://github.com/zoeferencova/" target="_blank"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/zoeferencova/" target="_blank"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <img className={styles.securityMockup} src={require("../../images/light-logo.png")} alt="small logo" />
                </footer>
                <img className={styles.shape1} src={require("../../images/shape1.png")} alt="decorative shape" />
                <img className={styles.shape2} src={require("../../images/shape2.png")} alt="decorative shape" />
            </main>
        )
    }
}

export default withRouter(LandingPage);