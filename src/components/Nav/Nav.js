import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

export default class Nav extends Component {
    render() {
        return (   
            <nav className={styles.nav}>
                <NavLink to={this.props.isLoggedIn ? "/home" : "/"}><img src={require("../../images/placeholder-logo.png")} alt="logo" className={styles.logo} /></NavLink>
                {this.props.isLoggedIn ? 
                    <ul className={styles.navLinks}>
                        <li><NavLink to="/messages"><i className="far fa-comment"></i> Messages</NavLink></li>
                        <li><NavLink to="/account"><i className="far fa-user"></i> Account</NavLink></li>
                    </ul>
                :
                    <ul className={styles.navLinks}>
                        <li><NavLink to="/login">Log In</NavLink></li>
                        <li><NavLink to="/register">Sign Up</NavLink></li>
                    </ul>
                } 
            </nav>  
        )
    }
}