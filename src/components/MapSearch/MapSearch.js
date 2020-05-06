import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class MapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  useEffect() {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_API_KEY}&libraries=places`
      window.document.body.appendChild(googleMapScript);
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

// import React, { Component } from "react";
// import Script from "react-load-script";

// import styles from "./MapSearch.module.css"

// export default class MapSearch extends Component {
//     state = {
//         query: "",
//         location: {
//             lat: null,
//             lng: null
//         }
//     };

//     handleScriptLoad = () => {
//         this.autocomplete = new window.google.maps.places.Autocomplete(
//             document.getElementById("autocomplete"),
//         );

//         this.autocomplete.setFields(["address_components", "formatted_address"]);

//         this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
//     }
  
//     handlePlaceSelect = () => {
//         const addressObject = this.autocomplete.getPlace().geometry.location;

//         if (address) {
//             this.setState({ query: addressObject.formatted_address });
//         }


//     }

//     geocode() {

//     }

//     render() {
//         return (
//             <div>
//                 <Script
//                     url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPEhrQmxY5UVQtIQdnTN4sJWWuhejKVas&libraries=places"
//                     onLoad={this.handleScriptLoad}
//                 />
//                 <input id="autocomplete" defaultValue={this.state.query} className={styles.input} />
//             </div>
//         );
//     }
// }