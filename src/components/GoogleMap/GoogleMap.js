import React, { useRef, useEffect } from "react";

const mapStyles = {
    height: "300px",
    width: "400px",
};

export default function GoogleMaps(props) {
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);
    const circle = useRef(null);
    const radius = parseFloat(props.radius)*1609.344 || 1609.344;

    const createGoogleMap = () => {
        return new window.google.maps.Map(googleMapRef.current, {
            zoom: 14,
            center: props.location,
            disableDefaultUI: true,
        });
    }
        

    const createMarker = () => {
        props.displayMarker &&
        new window.google.maps.Marker({
            position: {lat: props.location.lat, lng: props.location.lng},
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
            center: props.location,
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