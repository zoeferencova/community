import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import UserDataService from "../../services/user-data-service";
import CommUnityContext from "../../contexts/context";
import styles from "./AccountPage.module.css"
import {Input, Label, ProfilePicture, ButtonDark, ButtonLight, Error} from "../../components/Utils/Utils";

class AccountPage extends Component {
    static contextType = CommUnityContext;

    state = {
        first_name: this.context.user.first_name,
        email: this.context.user.email,
        error: null
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
            .catch(res => {
                this.setState({...this.state, error: res.error })
            })
    }

    render() {
        return (   
            <main className={styles.main}>
                <button className={styles.backButton} type="button" onClick={() => this.props.history.push("/home")}><i className="fas fa-arrow-left"></i></button>
                {this.context.user.first_name && <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <ProfilePicture className={styles.profPic} first_name={this.context.user.first_name} />
                    {this.state.error && <Error message={this.state.error} />}
                    <Label htmlFor="first_name">First Name</Label>
                    <Input required type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handleChangeName} />
                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} />
                    <div className={styles.buttonContainer}>
                        <ButtonLight className={styles.logoutButton} type="button" onClick={this.handleLogout}>Log out</ButtonLight>
                        <ButtonDark type="submit">Update</ButtonDark>
                    </div>
                    <div className={styles.links}>
                        <Link to="/change-password"><i className="fas fa-key"></i> Change password</Link>
                        <Link to="/location"><i className="fas fa-map-marker-alt"></i> Change location</Link>
                        <Link to="/confirm-deactivation"><i className="fas fa-ban"></i> Deactivate account</Link>
                    </div>
                </form>}
            </main>
        )
    }
}

export default withRouter(AccountPage);