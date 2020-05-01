import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./AccountPage.module.css"

export default class AccountPage extends Component {
    static contextType = CommUnityContext;

    state = {
        first_name: this.context.currentUser.first_name,
        email: this.context.currentUser.email
    }

    handleChangeName = e => {
        this.setState({ first_name: e.target.value })
    }

    handleChangeEmail = e => {
        this.setState({ email: e.target.value })
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
                    <div>
                        <a href="#">Change password</a>
                        <a href="#">Deactivate account</a>
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Save</button>
                </form>
            </main>
        )
    }
}