import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import UserDataService from "../../services/user-data-service";
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
        this.context.logout();
    }

    handleSubmit = e => {
        e.preventDefault();

        const { first_name, email } = this.state;
        const userInfo = { first_name, email };
        const userId = this.context.user.id;

        UserDataService.patchUser(userInfo, userId)
            .then(res => {
                this.context.updateUser(userInfo)
            })
    }

    render() {
        return (   
            <main>
                <h3>Account</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input required type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handleChangeName} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} />
                    </div>
                    <button type="button" onClick={() => this.props.history.push("/home")}>Cancel</button>
                    <button type="submit">Save</button>
                    <button type="button" onClick={this.handleLogout}>Log out</button>
                    <div className={styles.links}>
                        <Link to="/change-password">Change password</Link>
                        <Link to="/location">Change location</Link>
                        <Link to="/confirm-deactivation">Deactivate account</Link>
                    </div>
                    
                </form>
            </main>
        )
    }
}

export default withRouter(AccountPage);