import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import { ButtonLight, ButtonDark, Input, Label } from "../../components/Utils/Utils";
import styles from "./LocationPage.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapSearch from "../../components/MapSearch/MapSearch";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";

const LocationPage = props => {
    const communityContext = useContext(CommUnityContext)

    const [userLocation, setUserLocation] = useState(props.userLocation)
    const [radius, setRadius] = useState(props.radius)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // Changes location in state on form input change
    const handleLocationChange = userLocation => {
        setUserLocation(userLocation)
    }

    // Changes radius in state on form input change
    const handleRadiusChange = e => {
        setRadius(+e.target.value)
    }

    // Handles location form submission 
    // Converts form values to location point and meters
    // Submits patch request to server and updates the user information and posts based on the new location
    // Pushes user location back to home page
    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        const pointLocation = UserDataService.locationToPoint(userLocation);
        const meterRadius = UserDataService.milesToMeters(radius)

        UserDataService.patchUser({ location: pointLocation, radius: meterRadius }, communityContext.user.id)
            .then(res => {
                setLoading(false)
                communityContext.updateUser({ location: userLocation, radius: radius })
                communityContext.getAllPosts(communityContext.user.id)
                navigate("/home")
            })
    }

    return (
        <main className={styles.main}>
            {userLocation && <>
                <div className={styles.map}>
                    <MapErrorBoundary>
                        <GoogleMap radius={radius} userLocation={userLocation} displayMarker={true} />
                    </MapErrorBoundary>
                </div>
                <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <MapSearch handleLocationChange={handleLocationChange} />
                    </div>
                    <div className={styles.radiusSection}>
                        <Label htmlFor="radius">Radius (miles)</Label>
                        <Input className={styles.radius} required type="number" step="0.25" name="radius" id="radius" value={radius} onChange={handleRadiusChange} />
                    </div>
                    <div className={styles.buttonSection}>
                        <ButtonLight type="button" onClick={() => navigate(-1)}>Cancel</ButtonLight>
                        <ButtonDark type="submit" className={styles.submitButton} loading={loading.toString()}>Use this location</ButtonDark>
                    </div>
                </form>
            </>}
        </main>
    )
}

export default LocationPage;

LocationPage.propTypes = {
    userLocation: PropTypes.objectOf(PropTypes.number),
    radius: PropTypes.number
}