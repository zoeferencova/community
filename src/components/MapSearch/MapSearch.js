import React, { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { PropTypes } from 'prop-types';
import config from '../../config';

import styles from "./MapSearch.module.css";

const MapSearch = props => {
  const [searchResult, setSearchResult] = useState(null)

  // const { isLoaded } = useLoadScript({
  //   key: process.env.REACT_APP_GMAP_API_KEY,
  //   libraries: config.GMAPS_LIBRARIES
  // });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY,
    libraries: config.GMAPS_LIBRARIES
  })

  const onLoad = result => {
    setSearchResult(result)
  }

  const onPlaceChanged = () => {
    if (searchResult !== null) {
      const result = searchResult.getPlace()
      const lat = result.geometry.location.lat()
      const lng = result.geometry.location.lng()

      props.handleLocationChange({ lat, lng });
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <div>
      {!isLoaded ? ('loading') : (

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            className={styles.input}
            placeholder="Type to search"
          />
        </Autocomplete>
      )}
    </div>)
};

export default MapSearch;

MapSearch.propTypes = {
  handleLocationChange: PropTypes.func
}

//const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  //   clearSuggestions
  // } = usePlacesAutocomplete({
  //   requestOptions: {},
  //   debounce: 300
  // });

  // const ref = useRef();
  // useOnclickOutside(ref, () => {
  //   // When user clicks outside of the component, we can dismiss
  //   // the searched suggestions by calling this method
  //   clearSuggestions();
  // });

  // const handleInput = e => {
  //   // Update the keyword of the input element
  //   setValue(e.target.value);
  // };

  // const handleSelect = ({ description }) => () => {
  //   // When user selects a place, we can replace the keyword without request data from API
  //   // by setting the second parameter as "false"
  //   setValue(description, false);
  //   clearSuggestions();

  //   // Get latitude and longitude via utility functions
  //   getGeocode({ address: description })
  //     .then((results) => getLatLng(results[0]))
  //     .then(({ lat, lng }) => {
  //       props.handleLocationChange({ lat, lng });
  //     }).catch(error => {
  //       console.log('Error: ', error)
  //     });
  // };

  // const renderSuggestions = () =>
  //   data.map((suggestion, i) => {
  //     const { structured_formatting: { main_text, secondary_text } } = suggestion;

  //     return (
  //       <li key={i} onClick={handleSelect(suggestion)} className={styles.suggestion}>
  //         <i className="fas fa-map-marker-alt"></i><strong>{main_text}</strong> <small>{secondary_text}</small>
  //       </li>
  //     );
  //   });

  // <div ref={ref}>
    //   <input
    //     className={styles.input}
    //     value={value}
    //     onChange={handleInput}
    //     // disabled={!ready}
    //     placeholder="Enter an address"
    //   />
    //   {/* We can use the "status" to decide whether we should display the dropdown or not */}
    //   {status === 'OK' && <ul className={styles.suggestionList}>
    //     {renderSuggestions()}
    //     <img src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png" alt="Powered by Google" className={styles.googleImage} />
    //   </ul>}
    // </div>