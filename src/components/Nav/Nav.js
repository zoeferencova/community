import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

export default class NavBar extends Component {
    render() {
        return (   
            <nav className={styles.nav}>
                <img src={import("../images/placeholder-logo.png")} className={styles.logo} />
                <ul className={styles.navLinks}>
                    <li><NavLink><i className="far fa-comment"></i> Messages</NavLink></li>
                    <li><NavLink><i className="far fa-user"></i> Account</NavLink></li>
                </ul>
            </nav>  
        )
    }
}