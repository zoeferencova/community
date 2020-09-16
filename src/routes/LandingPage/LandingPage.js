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
                        <p className={styles.subheading}>Right now, more than ever, we need to unite our communities and help those in need. CommUnity is a free platform that enables the sharing of services and resources to ensure no one is left stranded during the Coronavirus (COVID-19) outbreak.</p>
                        <div className={styles.buttonSection}>
                            <button className={styles.signupButton} type="button" onClick={() => this.props.history.push("/register")}>Start now</button>
                            <button className={styles.demoButton} type="button" onClick={() => this.props.history.push("/demo")}>See a demo</button>
                        </div> 
                    </div>
                    <div className={styles.right}>
                        <img className={styles.banner} src={require("../../images/banner.jpeg")} alt="grocery delivery" />
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
                            {/* icon here */}
                            <h3 className={styles.iconHeading}>Picking up supplies</h3>
                            <p className={styles.iconSubheading}>Running low on groceries, medicine, or household supplies? Our helpers can grab anything you need and drop them off at your doorstep.</p>
                        </div>
                        <div className={styles.iconSection}>
                            {/* icon here */}
                            <h3 className={styles.iconHeading}>Dog walking</h3>
                            <p className={styles.iconSubheading}>Our helpers can take your furry friend for a safe stroll if you don’t feel comfortable being out and about.</p>
                        </div>
                        <div className={styles.iconSection}>
                            {/* icon here */}
                            <h3 className={styles.iconHeading}>Friendly chat</h3>
                            <p className={styles.iconSubheading}>We know that quarantining can be an isolating and frightening time. Our helpers can offer a friendly chat through our secure instant messaging system.</p>
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.left}>
                        {/* mockup here */}
                    </div>
                    <div className={styles.right}>
                    <h2 className={styles.heading}>Your safety and security is important to us</h2>
                        <p className={styles.subheading}>We will never share any of your personal information. The other users in your neighborhood will only see your first name and location radius (not your exact location) so the amount of information that you share in the chat is 100% your call.</p>
                    </div>
                </section>
                <footer className={styles.footer}>Footer</footer>
            </main>
        )
    }
}

export default withRouter(LandingPage);