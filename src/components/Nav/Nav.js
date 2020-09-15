import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import { ProfilePicture } from "../Utils/Utils";

import styles from "./Nav.module.css";

export default class Nav extends Component {
    static contextType = CommUnityContext;

    render() {
        console.log(this.context.user)
        return (   
            <nav className={styles.nav}>
                {this.props.isLoggedIn ?
                    <NavLink to={"/home"}><img src={require("../../images/small-logo.png")} alt="logo" className={styles.smallLogo} /></NavLink>
                :
                    <NavLink to={"/"}><img src={require("../../images/big-logo.png")} alt="logo" className={styles.bigLogo} /></NavLink>
                }
                {this.props.isLoggedIn ? 
                    <>
                        <ul className={`${styles.navLinks} ${styles.mobile} navLinks`}>
                            <NavLink to="/messages"><li><i className="fas fa-comment"></i></li></NavLink>
                            <NavLink to="/account"><li><ProfilePicture first_name={this.props.first_name} /></li></NavLink>
                        </ul>
                        <ul className={`${styles.navLinks} ${styles.desktop}`}>
                            <NavLink to="/home"><li><i className="fas fa-home"></i></li></NavLink>
                            <NavLink to="/messages"><li><i className="fas fa-comment"></i></li></NavLink>
                            <NavLink to="/account"><li><ProfilePicture className={styles.profPic} first_name={this.props.first_name} /></li></NavLink>
                        </ul>
                    </>
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