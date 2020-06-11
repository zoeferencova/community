import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

export default class Nav extends Component {
    render() {
        return (   
            <nav className={styles.nav}>
                <NavLink to={this.props.isLoggedIn ? "/home" : "/"}><img src={require("../../images/logo-placeholder.png")} alt="logo" className={styles.logo} /></NavLink>
                {this.props.isLoggedIn ? 
                    <ul className={styles.navLinks}>
                        <NavLink to="/messages"><li><i className="far fa-comment"></i></li></NavLink>
                        <NavLink to="/account"><li><i className="far fa-user"></i></li></NavLink>
                    </ul>
                :
                    <ul className={styles.navLinks}>
                        <NavLink to="/login"><li className={styles.logIn}>Log In</li></NavLink>
                        <NavLink to="/register"><li className={styles.signUp}>Sign Up</li></NavLink>
                    </ul>
                } 
            </nav>  
        )
    }
}