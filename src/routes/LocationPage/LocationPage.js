import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./LocationPage.module.css";

export default class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        location: this.context.currentUser.location,
        radius: this.context.currentUser.radius
    }

    handleLocationChange = e => {
        this.setState({ location: e.target.value });
    }

    handleRadiusChange = e => {
        this.setState({ radius: e.target.value });
    }
    
    render() {
        return (   
            <main className={styles.main}>
                <h3>Location Settings</h3>
                <div className={styles.map}>
                    <p>Placeholder for Google map showing current location</p>
                </div>
                <form className={styles.form}>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" id="location" value={this.state.location} onChange={this.handleLocationChange} />
                    </div>
                    <div>
                        <label htmlFor="radius">Radius</label>
                        <input type="number" name="radius" id="radius" value={this.state.radius} onChange={this.handleRadiusChange} />
                        <span>miles</span>
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Use this location</button>
                </form>
            </main>
        )
    }
}