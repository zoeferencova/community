import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import TokenService from "../../services/token-service";
import CommUnityContext from "../../contexts/context";
import styles from "./AccountPage.module.css"

class AccountPage extends Component {
    static contextType = CommUnityContext;

    state = {
        first_name: this.context.user.first_name,
        email: this.context.user.email,
    }

    handleChangeName = e => {
        this.setState({ first_name: e.target.value })
    }

    handleChangeEmail = e => {
        this.setState({ email: e.target.value })
    }

    handleLogout = e => {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.props.setLoggedIn(false);
        this.props.history.push("/");
    }

    render() {
        return (   
            <main>
                <h3>Account</h3>
                <form className={styles.form}>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handleChangeName} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} />
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Save</button>
                    <button onClick={this.handleLogout}>Log out</button>
                    <div className={styles.links}>
                        <Link to="/change-password">Change password</Link>
                        <Link to="/location">Change location</Link>
                        <p>Deactivate account</p>
                    </div>
                    
                </form>
            </main>
        )
    }
}

export default withRouter(AccountPage);