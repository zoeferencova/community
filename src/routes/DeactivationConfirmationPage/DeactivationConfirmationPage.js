import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import TokenService from "../../services/token-service";

class DeactivationConfirmationPage extends Component {
    static contextType = CommUnityContext;

    goBack = () => {
        this.props.history.push("/account")
    }

    handleDeactivation = () => {
        const userId = this.context.user.id;
        UserDataService.deleteUser(userId)
            .then(res => {
                TokenService.clearAuthToken();
                this.props.setLoggedIn(false);
                this.props.history.push("/deactivated");
            })
    }
    
    render() {
        return ( 
            <div>
                <h3>Deactivate Account</h3>
                <h4>We're sad to see you go. Are you sure you want to deactivate your account?</h4>
                <button onClick={this.goBack}>Nevermind!</button>
                <button onClick={this.handleDeactivation}>Yes</button>
            </div>  
        )
    }
}

export default withRouter(DeactivationConfirmationPage)