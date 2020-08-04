import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Input, Label } from "../../components/Utils/Utils";
import styles from "./ChangePasswordPage.module.css";
import UserDataService from "../../services/user-data-service";
import AuthApiService from "../../services/auth-api-service";

class ChangePasswordPage extends Component {
    static contextType = CommUnityContext;

    state = {
        error: null
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { old_password, new_password, confirm_password } = e.target;
        const { user } = this.context
        
        if (new_password.value !== confirm_password.value) {
            return this.setState({ error: "New password and confirm password do not match" })
        }

        AuthApiService.checkPassword({ password: old_password.value })
            .then(res => {
                if (res.error) {
                    return this.setState({ error: "Old password is incorrect" })
                } else {
                    return UserDataService.patchUser({ password: new_password.value }, user.id)
                        .then(res => {
                            if (!res.ok) {
                                res.json().then(resJson => this.setState({ error: resJson.error }))
                            } else {
                                console.log("success")
                                this.props.history.push("/account")
                            }
                        })
                }
            })
    }
    
    render() {
        return ( 
            <div className={styles.main}>
                <h3>Change Password</h3>
                {this.state.error && 
                <div role="alert">
                    <p>{this.state.error}</p>
                </div>} 
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <Label htmlFor="old_password">Old Password</Label>
                        <Input type="password" name="old_password" id="old_password" />
                    </div>
                    <div>
                        <Label htmlFor="new_password">New Password</Label>
                        <Input type="password" name="new_password" id="new_password" />
                    </div>
                    <div>
                        <Label htmlFor="confirm_password">Confirm New Password</Label>
                        <Input type="password" name="confirm_password" id="confirm_password" />
                    </div>
                    <div className={styles.buttonSection}>
                        <ButtonLight type="button" onClick={() => this.props.history.goBack()}>Cancel</ButtonLight>
                        <ButtonDark type="submit">Change Password</ButtonDark>
                    </div>
                </form>
            </div>  
        )
    }
}

export default withRouter(ChangePasswordPage);