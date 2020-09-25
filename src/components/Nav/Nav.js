import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ProfilePicture } from "../Utils/Utils";

import styles from "./Nav.module.css";

export default class Nav extends Component {
    static contextType = CommUnityContext;

    handleClick(e) {
        return (window.location.pathname === "/location" && !this.context.user.location.lat) ? this.props.isLoggedIn && e.preventDefault() : ""
    }

    render() {
        return (   
            <nav className={styles.nav}>
                {this.props.isLoggedIn ?
                    <NavLink to={"/home"} onClick={e => this.handleClick(e)}><img src={require("../../images/small-logo.png")} alt="logo" className={styles.smallLogo} /></NavLink>
                :
                    <NavLink to={"/"}><img src={require("../../images/big-logo.png")} alt="logo" className={styles.bigLogo} /></NavLink>
                }
                {this.props.isLoggedIn ? 
                    <>
                        <ul className={`${styles.navLinks} ${styles.mobile} navLinks`}>
                            <NavLink to="/messages" onClick={e => this.handleClick(e)}><li><i className="fas fa-comment"></i></li></NavLink>
                            <NavLink to="/account" onClick={e => this.handleClick(e)}><li><ProfilePicture first_name={this.props.first_name} /></li></NavLink>
                        </ul>
                        <ul className={`${styles.navLinks} ${styles.desktop}`}>
                            <NavLink to="/home" onClick={e => this.handleClick(e)}><li><i className="fas fa-home"></i></li></NavLink>
                            <NavLink to="/messages" onClick={e => this.handleClick(e)}><li><i className="fas fa-comment"></i></li></NavLink>
                            <NavLink to="/account" onClick={e => this.handleClick(e)}><li><ProfilePicture className={styles.profPic} first_name={this.props.first_name} /></li></NavLink>
                        </ul>
                    </>
                :
                    <ul className={styles.navLinks}>
                        <NavLink to="/login"><li className={styles.logIn}>Log in</li></NavLink>
                        <NavLink to="/register"><li className={styles.signUp}>Sign up</li></NavLink>
                    </ul>
                } 
            </nav>  
        )
    }
}

Nav.propTypes = {
    isLoggedIn: PropTypes.bool,
    first_name: PropTypes.string
}