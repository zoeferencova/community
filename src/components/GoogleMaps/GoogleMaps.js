import React from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";
import config from "../../config";

import styles from "./GoogleMaps.module.css"

const GoogleMaps = props => {
    const defaultRadius = 1609.344;
    const defaultLocation = { lat: 40.7450271, lng: -73.8858674 }
    const radius = parseFloat(props.radius) * 1609.344 || defaultRadius;
    const userLocation = props.userLocation || defaultLocation;
    const zoom = props.sideBar ? 12 : 13;

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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY,
        libraries: config.GMAPS_LIBRARIES
    })

    // const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map) {
    //     setMap(map)
    // }, [])

    // const onUnmount = useCallback(function callback(map) {
    //     setMap(null)
    // }, [])

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName={`${styles.googleMap} ${props.sideBar && styles.sideBar}`}
                    center={userLocation}
                    zoom={zoom}
                    options={mapOptions}
                // onLoad={onLoad}
                // onUnmount={onUnmount}
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

export default React.memo(GoogleMaps)