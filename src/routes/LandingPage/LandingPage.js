import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./LandingPage.module.css";

class LandingPage extends Component {
    render() {
        return (   
            <main>
                <header className={styles.header}>
                    <h1>Coming together in a time of need</h1>
                    <p>Right now, more than ever, we need to unite our communities and help those in need. CommUnity is a free platform that enables the sharing of services and resources to ensure no one is left stranded during the Coronavirus (COVID-19) outbreak.</p>
                    <button type="button" onClick={() => this.props.history.push("/register")}>Start Now</button>
                </header>
                <section className={styles.section}>
                    <h2>How does it work?</h2>
                    <p>[<em>placeholder for screenshot of main feed page</em>]</p>
                    <p>CommUnity lets users post offers or requests for help and see other active postings in their neighborhood.</p>
                </section>
                <section className={styles.section}>
                    <h2>What can our helpers help with?</h2>
                    <p>[<em>placeholder for graphic related to various services offered</em>]</p>
                    <p>Our helpers can assist with picking up supplies, running errands, or even just a friendly phone call or chat.</p>
                </section>
                <section className={styles.section}>
                    <h2>Safety and security are important to us</h2>
                    <p>[<em>placeholder for screenshot of chat/map</em>]</p>
                    <p>Your exact address will never be shared with other users, just your first name and neighborhood. Once matched with a helper or person requesting help, you will enter a private chat with the user where you can securely discuss details of the request.</p>
                </section>
                <footer className={styles.footer}>Footer</footer>
            </main>
        )
    }
}

export default withRouter(LandingPage);