import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css";

export default class LandingPage extends Component {
    render() {
        return (   
            <main>
                <header className={styles.header}>
                    <h1>Coming together in a time of need</h1>
                    <p>Right now, more than ever, we need to unite our communities and help those in need. CommUnity is a free platform that enables the sharing of services and resources to ensure no one is left stranded during the Coronavirus (COVID-19) outbreak.</p>
                    <Link to="/register"><button>Start Now</button></Link>
                </header>
                <section className={styles.section}>
                    <h2>How does it work?</h2>
                    <p>[<em>placeholder for screenshot of main feed page</em>]</p>
                    <p>CommUnity lets users post offers or requests for help and see other active postings in their neighborhood.</p>
                </section>
                <section className={styles.section}>
                    <h2>What can our helpers help with?</h2>
                    <p>[<em>placeholder for graphic related to various services offered</em>]</p>
                    <p>Our helpers can assist with picking up supplies, running errands, or even just a friendly phone call or chat.</p>
                </section>
                <section className={styles.section}>
                    <h2>Safety and security are important to us</h2>
                    <p>[<em>placeholder for screenshot of chat/map</em>]</p>
                    <p>Your exact address will never be shared with other users, just your first name and neighborhood. Once matched with a helper or person requesting help, you will enter a private chat with the user where you can securely discuss details of the request.</p>
                </section>
                <footer className={styles.footer}>Footer</footer>
            </main>
        )
    }
}

// function initGmap() {
//     let startLat = parseFloat(document.getElementById("lat").value)
//     let startLng = parseFloat(document.getElementById("lng").value)
//     let hideMarker = document.getElementById("hideMarker").value === "true"
//     let radiusInput = document.getElementById("radius")
//     let radius = parseInt(radiusInput.value)
//     let startingPoint = {lat: startLat || -33.8688, lng: startLng || 151.2195}

//     let map = new google.maps.Map(document.getElementById('gmap'), {
//       center: startingPoint,
//       zoom: 3,
//       disableDefaultUI: true,
//     });
    
//     let marker = new google.maps.Marker({
//       map: map,
//       anchorPoint: new google.maps.Point(0, -29)
//     });

//     if(startLat && startLng){
//       if(!hideMarker){
//         marker.setPosition(startingPoint);
//       }
      
//       if(radius){
//         const circle = new google.maps.Circle({
//           map: map,
//           strokeWeight: 1,
//           strokeColor: '#48bb78',
//           radius: radius,    // 10 miles in metres
//           fillColor: '#abf5aa',
//           center: startingPoint
//         });

//         map.fitBounds(circle.getBounds())
//       } else {
//         map.setZoom(12);
//       }
//     }
//   }

//   initGmap()