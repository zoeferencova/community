import React, { Component } from "react";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import { ButtonLight, ButtonDark, Input, Label } from "../../components/Utils/Utils";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";

export default class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        location: this.props.location,
        radius: parseFloat(this.props.radius),
        loading: false
    }

    handleLocationChange = location => {
        this.setState({ location });
    }

    handleRadiusChange = e => {
        this.setState({ radius: parseFloat(e.target.value) });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const pointLocation = UserDataService.locationToPoint(this.state.location);
        const meterRadius = UserDataService.milesToMeters(this.state.radius)
        UserDataService.patchUser({ location: pointLocation, radius: meterRadius }, this.context.user.id)
            .then(res => {
                this.context.updateUser({ location: this.state.location, radius: this.state.radius })
            })
            .then(res => {
                this.context.getAllPosts(this.context.user.id)
                this.setState({...this.state, loading: false })
                this.props.history.push("/home")
            })
    }
    
    render() {
        return (   
            <main className={styles.main}>
                {this.state.location && <>
                    <div className={styles.map}>
                        <MapErrorBoundary>
                            <GoogleMap radius={this.state.radius} location={this.state.location} displayMarker={true} />
                        </MapErrorBoundary>
                    </div>
                    <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <MapSearch handleLocationChange={this.handleLocationChange} />
                        </div>
                        <div className={styles.radiusSection}>
                            <Label htmlFor="radius">Radius (miles)</Label>
                            <Input className={styles.radius} required type="number" step="0.25" name="radius" id="radius" value={this.state.radius} onChange={this.handleRadiusChange} />
                        </div>
                        <div className={styles.buttonSection}>
                            <ButtonLight type="button" onClick={this.props.history.goBack}>Cancel</ButtonLight>
                            <ButtonDark type="submit" className={styles.submitButton} loading={this.state.loading.toString()}>Use this location</ButtonDark>
                        </div>
                    </form>
                </>}
            </main>
        )
    }
}