import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch"

export default class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        location: this.context.currentUser.location,
        radius: this.context.currentUser.radius
    }

    handleLocationChange = location => {
        this.setState({ location });
    }

    handleRadiusChange = e => {
        this.setState({ radius: e.target.value });
    }
    
    render() {
        return (   
            <main className={styles.main}>
                <h3>Location Settings</h3>
                <div className={styles.map}>
                    <GoogleMap radius={this.state.radius} location={this.state.location} displayMarker={true} />
                </div>
                <form className={styles.form}>
                    <div>
                        <label htmlFor="location">Location</label>
                        <MapSearch handleLocationChange={this.handleLocationChange} currentLocation={this.state.location} />
                    </div>
                    <div>
                        <label htmlFor="radius">Radius</label>
                        <input type="number" step="0.25" name="radius" id="radius" value={this.state.radius} onChange={this.handleRadiusChange} />
                        <span>miles</span>
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Use this location</button>
                </form>
            </main>
        )
    }
}