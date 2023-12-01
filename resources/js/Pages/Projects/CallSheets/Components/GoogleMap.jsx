import React, { useRef, useState, useEffect } from 'react';

const GoogleMap = ({ newData, locationData  }) => {



  const googleMapRef = useRef(null);
  let googleMap;

  const googleMapApiKey = window.GoogleMapApi;

  const [error, setError] = useState(null);
  const [geoLocationData, setGeoLocationData] = useState(null);

  let { street_address, zip_code } = locationData;
 
  useEffect(() => {
      if (locationData) {
          const { latitude, longitude } = locationData;
          if (latitude && longitude) {
              setGeoLocationData({ lat: latitude, lng: longitude });
          }
      }
  }, [locationData]);

  // Check if newData and its nested properties exist and are not empty
  if (newData && newData.film_location && newData.film_location.location) {
      if (newData.film_location.location.street_address) {
          street_address = newData.film_location.location.street_address;
      }
      if (newData.film_location.location.zip_code) {
          zip_code = newData.film_location.location.zip_code;
      }
  }

  const newStreetAddress = newData?.film_location?.location?.street_address || '';
  const newZipCode = newData?.film_location?.location?.zip_code || '';


   // Check if locationData is empty
  if (!locationData || !locationData.street_address || !locationData.zip_code) {
    // Render a div if locationData is empty
    return (
      <div>
        Location data is not available. Please add a location to view the map.
      </div>
    );
  }

 

  useEffect(() => {
    const initializeMap = () => {
      // Convert lat and lng from string to float
      const latitude = parseFloat(geoLocationData.lat);
      const longitude = parseFloat(geoLocationData.lng);
  
      // Check if the latitude and longitude are valid numbers
      if (!isNaN(latitude) && !isNaN(longitude)) {
          googleMap = new window.google.maps.Map(googleMapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: true,
          });
  
          new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: googleMap,
          });
      } else {
          console.error('Invalid geolocation data:', geoLocationData);
      }
  };
  
    window.initGoogleMap = initializeMap;
  
    if (geoLocationData) {
      if (!window.googleMapsScriptLoaded) {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initGoogleMap`;
        googleMapScript.async = true;
        document.body.appendChild(googleMapScript);
        window.googleMapsScriptLoaded = true;
      } else {
        // Re-initialize the map with new data
        initializeMap();
      }
    }
  
    return () => {
      // Clean up the global function
      delete window.initGoogleMap;
    };
  }, [geoLocationData, googleMapApiKey]);
  


  

  if (error) {
    return <div className='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400'>{error}</div>;
  }

  if (!geoLocationData) {
    return <div className='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400'>Loading Location Data...</div>;
  }


  return <div ref={googleMapRef} style={{ width: '400px', height: '100%' }} />;
};

export default GoogleMap;