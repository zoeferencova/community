import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ProfilePicture } from "../Utils/Utils";

import styles from "./Nav.module.css";

const Nav = ({ isLoggedIn, first_name }) => {
    const communityContext = useContext(CommUnityContext);

    const location = useLocation();

    // Used to disable the user's ability to click on nav links when the user is initially sent to the location page after creating an account and logging in
    // This is done to avoid having the user go to the home page where none of the content would be rendered correctly if the user doesn't have a location saved
    const handleClick = e => location.pathname === "/location" && !communityContext.user.location.lat && (isLoggedIn && e.preventDefault())

    return (
        <nav className={styles.nav}>
            {/* Conditionally renders logged in nav bar or logged out nav bar based on isLoggedIn value from props */}
            {isLoggedIn ?
                <NavLink to={"/home"} id="loggedIn" onClick={e => handleClick(e)}>
                    <img src={require("../../images/small-logo.png")} alt="logo" className={styles.smallLogo} />
                </NavLink>
                :
                <NavLink to={"/"} id="loggedOut">
                    <img src={require("../../images/big-logo.png")} alt="logo" className={styles.bigLogo} />
                </NavLink>
            }
            {isLoggedIn ?
                <div id="loggedIn">
                    <ul className={`${styles.navLinks} ${styles.mobile} navLinks`}>
                        <NavLink to="/messages" onClick={e => handleClick(e)}>
                            <li><i className="fas fa-comment"></i></li>
                        </NavLink>
                        <NavLink to="/account" onClick={e => handleClick(e)}>
                            <li><ProfilePicture first_name={first_name} /></li>
                        </NavLink>
                    </ul>
                    <ul className={`${styles.navLinks} ${styles.desktop}`}>
                        <NavLink to="/home" onClick={e => handleClick(e)}>
                            <li><i className="fas fa-home"></i></li>
                        </NavLink>
                        <NavLink to="/messages" onClick={e => handleClick(e)}>
                            <li><i className="fas fa-comment"></i></li>
                        </NavLink>
                        <NavLink to="/account" onClick={e => handleClick(e)}>
                            <li><ProfilePicture className={styles.profPic} first_name={first_name} />
                            </li></NavLink>
                    </ul>
                </div>
                :
                <ul className={styles.navLinks} id="loggedOut">
                    <NavLink to="/login"><li className={styles.logIn}>Log in</li></NavLink>
                    <NavLink to="/register"><li className={styles.signUp}>Sign up</li></NavLink>
                </ul>
            }
        </nav>
    )
}

Nav.propTypes = {
    isLoggedIn: PropTypes.bool,
    first_name: PropTypes.string
}

export default Nav;