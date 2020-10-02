import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight, ButtonDark, Input, Label, Error } from "../Utils/Utils";
import styles from "../LoginForm/LoginForm.module.css"

class RegistrationForm extends Component {    
    state = { 
        first_name: "",
        email: "",
        password: "",
        confirm_password: "" 
    };
    
    handleSubmit(e) {
        e.preventDefault();

        const { first_name, email, password, confirm_password } = this.state;
        this.props.register(first_name, email, password, confirm_password);
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                {this.props.error && <Error message={this.props.error} />}                
                <Label htmlFor="first_name">First name</Label>
                <Input required type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={e => this.setState({ ...this.state, first_name: e.target.value })} />
                <Label htmlFor="email">Email</Label>
                <Input required type="email" name="email" id="email" value={this.state.email} onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password" id="password" value={this.state.password} onChange={e => this.setState({ ...this.state, password: e.target.value })} />
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input required type="password" name="confirm_password" id="confirm_password" value={this.state.confirm_password} onChange={e => this.setState({ ...this.state, confirm_password: e.target.value })} />
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/")}>Cancel</ButtonLight>
                    <ButtonDark type="submit" className={styles.registerButton} loading={this.props.loading.toString()}>Create account</ButtonDark>
                </div>
                
            </form>
        )
    }
}

export default withRouter(RegistrationForm)