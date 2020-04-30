import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css";

export default class LandingPage extends Component {
    render() {
        return (   
            <main>
                <header className={styles.header}>
                    <h1>CommUnity</h1>
                    <h2>Coming together in a time of need</h2>
                    <p>Right now, more than ever, we need to unite our communities and help those in need. CommUnity is a free platform that enables the sharing of services and resources to ensure no one is left stranded during the Coronavirus (COVID-19) outbreak.</p>
                    <Link to="/register"><button>Start Now</button></Link>
                </header>
                <section className={styles.section}>
                    <h3>How does it work?</h3>
                    <p>[<em>placeholder for screenshot of main feed page</em>]</p>
                    <p>CommUnity lets users post offers or requests for help and see other active postings in their neighborhood.</p>
                </section>
                <section className={styles.section}>
                    <h3>What can our helpers help with?</h3>
                    <p>[<em>placeholder for graphic related to various services offered</em>]</p>
                    <p>Our helpers can assist with picking up supplies, running errands, or even just a friendly phone call or chat.</p>
                </section>
                <section className={styles.section}>
                    <h3>Safety and security are important to us</h3>
                    <p>[<em>placeholder for screenshot of chat/map</em>]</p>
                    <p>Your exact address will never be shared with other users, just your first name and neighborhood. Once matched with a helper or person requesting help, you will enter a private chat with the user where you can securely discuss details of the request.</p>
                </section>
                <footer className={styles.footer}>Footer</footer>
            </main>
        )
    }
}