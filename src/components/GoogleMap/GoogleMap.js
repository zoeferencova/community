import React from "react";
import { GoogleMap, Marker, Circle, useLoadScript } from "@react-google-maps/api";
import config from "../../config";

import styles from "./GoogleMap.module.css"
import { PropTypes } from 'prop-types';

export default function GoogleMaps(props) {
    const defaultRadius = 1609.344;
    const defaultLocation = { lat: 40.7450271, lng: -73.8858674 }
    const radius = parseFloat(props.radius) * 1609.344 || defaultRadius;
    const userLocation = props.userLocation || defaultLocation;

    const circleOptions = {
        strokeColor: '#4d9e9a',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#84c4c1',
        fillOpacity: 0.35,
    }

    const mapOptions = {
        disableDefaultUI: true
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY,
        libraries: config.GMAPS_LIBRARIES
    });

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName={styles.googleMap}
                    center={userLocation}
                    zoom={13}
                    options={mapOptions}
                >
                    {props.displayMarker &&
                        <Marker position={userLocation} />
                    }
                    <Circle
                        center={userLocation}
                        radius={radius}
                        options={circleOptions}
                    />
                </GoogleMap>
            )}
        </div>
    )
}

GoogleMaps.propTypes = {
    userLocation: PropTypes.objectOf(PropTypes.number),
    radius: PropTypes.number,
    displayMarker: PropTypes.bool
}