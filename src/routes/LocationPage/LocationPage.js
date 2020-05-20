import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch"

export default class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        location: this.context.user.location,
        radius: parseFloat(this.context.user.radius)
    }

    handleLocationChange = location => {
        this.setState({ location });
    }

    handleRadiusChange = e => {
        this.setState({ radius: parseFloat(e.target.value) });
    }

    handleSubmit = e => {
        e.preventDefault();
        const pointLocation = UserDataService.locationToPoint(this.state.location);
        const meterRadius = UserDataService.milesToMeters(this.state.radius)
        UserDataService.patchUser({ location: pointLocation, radius: meterRadius }, this.context.user.id)
            .then(res => {
                this.context.updateUser({ location: this.state.location, radius: this.state.radius })
                this.props.history.push("/home")
            })
    }
    
    render() {
        console.log(this.state)

        return (   
            <main className={styles.main}>
                <h3>Location Settings</h3>
                <div className={styles.map}>
                    <GoogleMap radius={this.state.radius} location={this.state.location} displayMarker={true} />
                </div>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="location">Location</label>
                        <MapSearch handleLocationChange={this.handleLocationChange} currentLocation={this.state.location} />
                    </div>
                    <div>
                        <label htmlFor="radius">Radius</label>
                        <input required type="number" step="0.25" name="radius" id="radius" value={this.state.radius} onChange={this.handleRadiusChange} />
                        <span>miles</span>
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Use this location</button>
                </form>
            </main>
        )
    }
}