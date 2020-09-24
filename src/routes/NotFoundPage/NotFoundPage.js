import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import styles from "./NotFoundPage.module.css"

export default class NotFoundPage extends Component {
    render() {
        return (   
            <>
                <h1 className={(window.location.pathname === "/location" && this.props.isLoggedIn) ? styles.hide : ""}>NotFoundPage</h1>
            </>
            
        )
    }
}

NotFoundPage.propTypes = {
    isLoggedIn: PropTypes.bool
}