import React, { useRef, useEffect } from "react";

export default function GoogleMaps(props) {
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);
    const circle = useRef(null);
    const defaultRadius = 1609.344;
    const defaultLocation = { lat: 40.7450271, lng: -73.8858674 }
    const radius = parseFloat(props.radius)*1609.344 || defaultRadius;
    const location = props.location || defaultLocation;

    const mapStyles = {
        height: "100%",
        width: "100%",
    };

    const createGoogleMap = () => {
        return new window.google.smaps.Map(googleMapRef.current, {
            zoom: 14,
            center: location,
            disableDefaultUI: true,
        });
    }
        

    const createMarker = () => {
        props.displayMarker &&
        new window.google.maps.Marker({
            position: location,
            map: googleMap.current
        });
    }
        
    const createCircle = () => {
        return new window.google.maps.Circle({
            strokeColor: '#4d9e9a',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#84c4c1',
            fillOpacity: 0.35,
            map: googleMap.current,
            center: location,
            radius: radius
        });
    }
        

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