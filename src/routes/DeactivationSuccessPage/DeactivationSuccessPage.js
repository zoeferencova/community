import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class DeactivationSuccessPage extends Component {
    render() {
        return ( 
            <div>
                <h3>Your account has been successfully deactivated</h3>
                <button onClick={() => this.props.history.push("/")}>Go to Home Page</button>
            </div>  
        )
    }
}

export default withRouter(DeactivationSuccessPage);