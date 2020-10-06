import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import UserDataService from "../../services/user-data-service";
import CommUnityContext from "../../contexts/context";
import styles from "./AccountPage.module.css"
import { Input, Label, ProfilePicture, ButtonDark, ButtonLight, Error, Success } from "../../components/Utils/Utils";

class AccountPage extends Component {
    static contextType = CommUnityContext;

    state = {
        first_name: this.context.user.first_name,
        email: this.context.user.email,
        error: null,
        loading: false,
    }

    // Sets updated value to state when first_name input value is changed
    handleChangeName = e => {
        this.setState({ ...this.state, first_name: e.target.value })
    }

    // Sets updated value to state when email input value is changed
    handleChangeEmail = e => {
        this.setState({ ...this.state, email: e.target.value })
    }

    // Calls logout function in context
    handleLogout = e => {
        e.preventDefault();
        this.context.logout();
    }

    // Handles form submission, updating the user's name and email information in state
    // Sends patch request to server to update user information
    handleSubmit = e => {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const { first_name, email } = this.state;
        const userInfo = { first_name, email };
        const userId = this.context.user.id;

        UserDataService.patchUser(userInfo, userId)
            .then(res => {
                this.setState({...this.state, loading: false })
                this.context.updateUser(userInfo)
            })
            .catch(res => {
                this.setState({...this.state, error: res.error, loading: false })
            })
    }

    render() {
        return (   
            <main className={styles.main}>
                <button className={styles.backButton} type="button" onClick={() => this.props.history.push("/home")}><i className="fas fa-arrow-left"></i></button>
                {this.context.user.first_name && <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <ProfilePicture className={styles.profPic} first_name={this.context.user.first_name} />
                    {this.state.error && <Error message={this.state.error} />}
                    {this.props.success && <Success message={this.props.success} />}
                    <Label htmlFor="first_name">First Name</Label>
                    <Input required type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handleChangeName} />
                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} />
                    <div className={styles.buttonContainer}>
                        <ButtonLight className={styles.logoutButton} type="button" onClick={this.handleLogout}>Log out</ButtonLight>
                        <ButtonDark type="submit" loading={this.state.loading.toString()}>Update</ButtonDark>
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