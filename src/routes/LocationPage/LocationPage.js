import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import { ButtonLight, ButtonDark, Input, Label } from "../../components/Utils/Utils";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";
import { withRouter } from "react-router-dom";

class LocationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        userLocation: this.props.userLocation,
        radius: parseFloat(this.props.radius),
        loading: false
    }

    handleLocationChange = userLocation => {
        this.setState({ userLocation });
    }

    handleRadiusChange = e => {
        this.setState({ radius: parseFloat(e.target.value) });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const pointLocation = UserDataService.locationToPoint(this.state.userLocation);
        const meterRadius = UserDataService.milesToMeters(this.state.radius)
        UserDataService.patchUser({ location: pointLocation, radius: meterRadius }, this.context.user.id)
            .then(res => {
                this.setState({...this.state, loading: false })
                this.context.updateUser({ location: this.state.userLocation, radius: this.state.radius })
                this.context.getAllPosts(this.context.user.id)
                this.props.history.push("/home")
            })
    }
    
    render() {
        return (   
            <main className={styles.main}>
                {this.state.userLocation && <>
                    <div className={styles.map}>
                        <MapErrorBoundary>
                            <GoogleMap radius={this.state.radius} userLocation={this.state.userLocation} displayMarker={true} />
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

export default withRouter(LocationPage)

LocationPage.propTypes = {
    userLocation: PropTypes.objectOf(PropTypes.number),
    radius: PropTypes.number
}