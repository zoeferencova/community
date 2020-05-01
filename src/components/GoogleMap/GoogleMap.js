import React, {useEffect, useRef} from "react";

const GOOGLE_MAP_API_KEY = "AIzaSyAPEhrQmxY5UVQtIQdnTN4sJWWuhejKVas";
const location = {
    lat: 40.7450271,
    lng: -73.8858674
};

const radius = 500;

const mapStyles = {
    width: "100%",
    height: "250px",
};

export default function GoogleMaps(props) {
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);
    const circle = useRef(null);

    const createGoogleMap = () =>
        new window.google.maps.Map(googleMapRef.current, {
            zoom: 14,
            center: {
                lat: location.lat,
                lng: location.lng
            },
            disableDefaultUI: true,
        });

    const createMarker = () =>
        new window.google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            map: googleMap.current
        });

    const createCircle = () => 
        new window.google.maps.Circle({
            strokeColor: '#4d9e9a',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#84c4c1',
            fillOpacity: 0.35,
            map: googleMap.current,
            center: {
                lat: location.lat,
                lng: location.lng
            },
            radius: radius
        });

    useEffect(() => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            googleMap.current = createGoogleMap();
            marker.current = createMarker();
            circle.current = createCircle();
        })
    });

    return (
        <div id="google-map" ref={googleMapRef} style={mapStyles} />
    )
}