// frontend/src/LocationSelector.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationSelector = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  
  const handleAllowLocation = () => {
    setLocationPermissionRequested(true);

    // Ask for location permission using the geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermissionGranted(true);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert('Location permission denied. Please enable location access.');
            setLocationPermissionGranted(false);
          } else {
            alert('Error fetching location. Please try again.');
            setLocationPermissionGranted(false);
          }
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLocationPermissionGranted(false);
    }
  };

  const handleDeclineLocation = () => {
    alert('Location access is required to use this feature. Please enable it manually in your browser settings.');
    setLocationPermissionRequested(true);
    setLocationPermissionGranted(false);
  };

  const handlePinDragEnd = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCurrentLocation(newLocation);
    onLocationSelect(newLocation);
  };

  return (
    <div>
      {!locationPermissionRequested && (
        <div className="location-request">
          <p>We need your location to show the map. Do you allow us to access your location?</p>
          <button onClick={handleAllowLocation}>Allow Location</button>
          <button onClick={handleDeclineLocation}>Deny Location</button>
        </div>
      )}

      {locationPermissionGranted && currentLocation && (
        <LoadScript googleMapsApiKey="AIzaSyAQkp2_fUKvvfKcv-iOHQC3qsP6dNEu3go">
          <GoogleMap
            id="location-selector"
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={currentLocation}
            zoom={12}
          >
            <Marker
              position={currentLocation}
              draggable
              onDragEnd={handlePinDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default LocationSelector;
