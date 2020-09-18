import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { ButtonDark } from "../../components/Utils/Utils";

import styles from "./DeactivationSuccessPage.module.css";

class DeactivationSuccessPage extends Component {
    render() {
        return ( 
            <div className={styles.main}>
                <h3>Your account has been successfully deactivated</h3>
                <ButtonDark onClick={() => this.props.history.push("/")}>Go to Home Page</ButtonDark>
            </div>  
        )
    }
}

export default withRouter(DeactivationSuccessPage);