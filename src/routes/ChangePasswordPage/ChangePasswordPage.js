import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ChangePasswordPage extends Component {
    render() {
        return ( 
            <div>
                <h3>Change Password</h3>
                <form>
                    <div>
                        <label htmlFor="old_password">Old Password</label>
                        <input type="password" name="old_password" id="old_password" />
                    </div>
                    <div>
                        <label htmlFor="new_password">New Password</label>
                        <input type="password" name="new_password" id="new_password" />
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm New Password</label>
                        <input type="password" name="confirm_password" id="confirm_password" />
                    </div>
                    <Link to="/account"><button>Cancel</button></Link>
                    <button type="submit">Change Password</button>
                </form>
            </div>  
        )
    }
}