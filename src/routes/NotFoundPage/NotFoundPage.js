import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight } from "../../components/Utils/Utils"
import { PropTypes } from 'prop-types';

import styles from "./NotFoundPage.module.css"

class NotFoundPage extends Component {
    redirect = () => {
        this.props.isLoggedIn ? this.props.history.push("/home") : this.props.history.push("/");
    }
    
    render() {
        return (   
            <>
                <div className={(window.location.pathname === "/location" && this.props.isLoggedIn) ? styles.hide : styles.notFound}>
                    <img src={require("../../images/not-found.png")} alt="Not found error" className={styles.image}></img>
                    <h1 className={styles.title}>Sorry, that page couldn't be found</h1>
                    <ButtonLight onClick={this.redirect}>Take me home</ButtonLight>
                </div>
            </>
            
        )
    }
}

export default withRouter(NotFoundPage)

NotFoundPage.propTypes = {
    isLoggedIn: PropTypes.bool
}