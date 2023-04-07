import React, { useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ProfilePicture, messageIcon, houseIcon, ButtonDark, ButtonLight } from "../Utils/Utils";

import styles from "./Nav.module.css";

const Nav = ({ isLoggedIn, first_name }) => {
    const communityContext = useContext(CommUnityContext);

    const location = useLocation();
    const navigate = useNavigate();

    // Used to disable the user's ability to click on nav links when the user is initially sent to the location page after creating an account and logging in
    // This is done to avoid having the user go to the home page where none of the content would be rendered correctly if the user doesn't have a location saved
    const handleClick = e => location.pathname === "/location" && !communityContext.user.location.lat && (isLoggedIn && e.preventDefault())

    return (
        <nav className={`${styles.nav} ${!isLoggedIn ? styles.landing : undefined}`}>
            <NavLink to={isLoggedIn ? "/home" : "/"} onClick={e => handleClick(e)}>
                <img src={require("../../images/logo.png")} alt="logo" className={styles.logo} />
            </NavLink>
            {isLoggedIn ?
                <div id="loggedIn">
                    <ul className={`${styles.navLinks} ${styles.mobile} navLinks`}>
                        <NavLink to="/account" onClick={e => handleClick(e)}>
                            <li><ProfilePicture first_name={first_name} /></li>
                        </NavLink>
                    </ul>
                    {location.pathname !== "/messages" &&
                        <ul className={`${styles.navLinks} ${styles.desktop}`}>
                            <NavLink to="/home" onClick={e => handleClick(e)}>
                                <li>{houseIcon}</li>
                            </NavLink>
                            <NavLink to="/messages" onClick={e => handleClick(e)}>
                                <li>{messageIcon}</li>
                            </NavLink>
                            <NavLink to="/account" onClick={e => handleClick(e)}>
                                <li><ProfilePicture className={styles.profPic} first_name={first_name} /></li>
                            </NavLink>
                        </ul>
                    }
                </div>
                :
                <div className={styles.navLinks} id="loggedOut">
                    <ButtonLight className={styles.logIn} large="true" onClick={() => navigate('/login')}>Log in</ButtonLight>
                    <ButtonDark className={styles.signUp} large="true" onClick={() => navigate('/register')}>Sign up</ButtonDark>
                </div>
            }
        </nav>
    )
}

Nav.propTypes = {
    isLoggedIn: PropTypes.bool,
    first_name: PropTypes.string
}

export default Nav;