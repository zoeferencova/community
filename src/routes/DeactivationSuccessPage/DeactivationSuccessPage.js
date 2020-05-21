import React, { Component } from "react";

export default class DeactivationSuccessPage extends Component {
    goToHomePage = () => {
        this.props.history.push("/")
    }
    
    render() {
        return ( 
            <div>
                <h3>Your account has been successfully deactivated</h3>
                <button onClick={this.goToHomePage}>Go to Home Page</button>
            </div>  
        )
    }
}