import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <NavLink to="/home" className={location.pathname === "/home" && styles.active}>Feed</NavLink>
            <NavLink to="/messages" className={location.pathname === "/messages" && styles.active}>Chats</NavLink>
            <NavLink to="/my-posts" className={location.pathname === "/my-posts" && styles.active}>My Posts</NavLink>
            <NavLink to="/location" className={location.pathname === "/location" && styles.active}>My Location</NavLink>
        </div >
    )
}

export default MobileMenu;