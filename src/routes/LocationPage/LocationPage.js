import React, { Component } from "react";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch"

export default class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        location: this.props.location,
        radius: parseFloat(this.props.radius)
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
            })
            .then(res => {
                this.context.getAllPosts(this.context.user.id)
                this.props.history.push("/home")
            })
    }
    
    render() {
        console.log(this.state)
        return (   
            <main className={styles.main}>
                {this.state.location && <>
                <h3>Location Settings</h3>
                <div className={styles.map}>
                    <GoogleMap radius={this.state.radius} location={this.state.location} displayMarker={true} />
                </div>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="location">Location</label>
                        <MapSearch handleLocationChange={this.handleLocationChange} />
                    </div>
                    <div>
                        <label htmlFor="radius">Radius</label>
                        <input required type="number" step="0.25" name="radius" id="radius" value={this.state.radius} onChange={this.handleRadiusChange} />
                        <span>miles</span>
                    </div>
                    <button type="button" onClick={this.props.history.goBack}>Cancel</button>
                    <button type="submit">Use this location</button>
                </form>
                </>}
            </main>
        )
    }
}