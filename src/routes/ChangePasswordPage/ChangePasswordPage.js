import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Input, Label, Error } from "../../components/Utils/Utils";
import styles from "./ChangePasswordPage.module.css";
import UserDataService from "../../services/user-data-service";
import AuthApiService from "../../services/auth-api-service";

class ChangePasswordPage extends Component {
    static contextType = CommUnityContext;

    state = {
        error: null,
        loading: false
    }
    
    handleSubmit = e => {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const { old_password, new_password, confirm_password } = e.target;
        const { user } = this.context
        
        if (new_password.value !== confirm_password.value) {
            return this.setState({loading: false, error: "New password and confirm password do not match" })
        }

        AuthApiService.checkPassword({ password: old_password.value })
            .then(res => {
                if (res.error) {
                    return this.setState({loading: false, error: "Old password is incorrect" })
                } else {
                    UserDataService.patchUser({ password: new_password.value }, user.id)
                        .then(res => {
                            this.setState({...this.state, loading: false})
                            this.context.updateSuccessMessage("Password successfully updated")
                            return this.props.history.push("/account")
                        })
                        .catch(res => this.setState({ error: res.error, loading: false }))
                }
            })
    }
    
    render() {
        return ( 
            <div className={styles.main}>
                <h3>Change Password</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    {this.state.error && <Error message={this.state.error} className={styles.error} />}                

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
                        <ButtonDark type="submit" className={styles.submitButton} loading={this.state.loading.toString()}>Change Password</ButtonDark>
                    </div>
                </form>
            </div>  
        )
    }
}

export default withRouter(ChangePasswordPage);