import React, { useRef, useEffect } from "react";
import { PropTypes } from 'prop-types';

export default function GoogleMaps(props) {
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);
    const circle = useRef(null);
    const defaultRadius = 1609.344;
    const defaultLocation = { lat: 40.7450271, lng: -73.8858674 }
    const radius = parseFloat(props.radius)*1609.344 || defaultRadius;
    const userLocation = props.userLocation || defaultLocation;

    const mapStyles = {
        height: "100%",
        width: "100%",
    };

    // Creates Google map and setting to googleMapRef
    const createGoogleMap = () => {
        return new window.google.maps.Map(googleMapRef.current, {
            zoom: 14,
            center: userLocation,
            disableDefaultUI: true,
        });
    }
        
    // Creates Google map marker and positions to user's location if displayMarker is true
    // Marker should only be displayed when the map is showing the user's location, not other user's maps
    const createMarker = () => {
        props.displayMarker &&
        new window.google.maps.Marker({
            position: userLocation,
            map: googleMap.current
        });
    }
        
    // Creates Google map radius circle 
    const createCircle = () => {
        return new window.google.maps.Circle({
            strokeColor: '#4d9e9a',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#84c4c1',
            fillOpacity: 0.35,
            map: googleMap.current,
            center: userLocation,
            radius: radius
        });
    }
        
    // Calls all map element create functions to display map
    useEffect(() => {
        googleMap.current = createGoogleMap();
        marker.current = createMarker();
        circle.current = createCircle();
        googleMap.current.fitBounds(circle.current.getBounds())
    });

    return (
        <div id="google-map" ref={googleMapRef} style={mapStyles} />
    )
}

GoogleMaps.propTypes = {
    userLocation: PropTypes.objectOf(PropTypes.number),
    radius: PropTypes.number,
    displayMarker: PropTypes.bool
}