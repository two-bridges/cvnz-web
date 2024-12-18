
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { geocodeByAddress, geocodeByLatLng, getLatLng } from 'react-google-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { ILocation } from 'src/redux/model/location.model';
import { TextField } from '@mui/material';
import uuid from 'uuid/v1';

const containerStyle = {
  width: '100%',
  height: '200px'
};

function GoogleMapsComponent(props) {

  const location: ILocation = props.location;
  const disabled = props.disabled ? props.disabled : false;
  const { handleCoordinateChange, className = "", ...rest } = props;

  const [address, setAddress] = useState(location?.address ?? '');

  console.log(`GoogleMapsComponent -> location: ${!!location}`);

  // DG: TBD. this may be redundant (unnecessary).  The parent already passes location as a prop so the state change is already seen by the component, without needing useEffect()... 
  useEffect(() => {
    // setting default location
    setAddress(location?.address ?? '');
  }, [location]);

  const handleSelect = async (address) => {
    const result: google.maps.GeocoderResult[] = await geocodeByAddress(address);
    const locationDetails: google.maps.GeocoderResult = result[0];
    const placeId = locationDetails.place_id;
    const latLng = await getLatLng(locationDetails);

    props.handleCoordinateChange(latLng, address, placeId);
  };

  // const onMarkerClick = (props, marker, e, event) => {
  //   console.log("onMarkerClick", props, marker, e)
  // }
  const onMarkerClick = async (e) => {
    const result: google.maps.GeocoderResult[] = await geocodeByLatLng(e.latLng);
    const locationDetails: google.maps.GeocoderResult = result[0];
    const placeId = locationDetails.place_id;
    const address = locationDetails.formatted_address;
    const latLng = await getLatLng(locationDetails);
    setAddress(address ?? '');
    props.handleCoordinateChange(latLng, address, placeId);

  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: location?.latitude ?? 0, lng: location?.longitude ?? 0 }}
        zoom={14}>
        <Marker
          key={1}
          position={{ lat: location?.latitude ?? 0, lng: location?.longitude ?? 0 }}
          draggable={true}
          onDragEnd={disabled || onMarkerClick}
        />
      </GoogleMap>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
        <div >
          <TextField
            style={{ marginTop: "20px" }}
            fullWidth
            label={props.inputTitle ? props.inputTitle : 'Search location'}
            name="name"
            {...getInputProps({
              placeholder: 'Search address',
              className: 'location-search-input',
            })}
            required
            variant="outlined"
            disabled={disabled}
          />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {

              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: 'lightgrey', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={suggestion.placeId}
                >
                  <span >{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>}</PlacesAutocomplete>
    </div>
  );
}

GoogleMapsComponent.propTypes = {
  className: PropTypes.string,
  handleCoordinateChange: PropTypes.func,
  location: PropTypes.object,
  inputTitle: PropTypes.string,
  disabled: PropTypes.bool
};
export default GoogleMapsComponent;
