import React, { useRef, useState, useEffect } from 'react';

const GoogleMap = ({ newData, locationData  }) => {

  console.log(newData);

  const googleMapRef = useRef(null);
  let googleMap;

  const apiKeyGeo = 'AIzaSyDKDDy79SZdsmJ9wY7YjOGP5U3YPNioSdU';
  const googleMapApiKey = 'AIzaSyDKDDy79SZdsmJ9wY7YjOGP5U3YPNioSdU';

  const [error, setError] = useState(null);
  const [geoLocationData, setGeoLocationData] = useState(null);

  let { street_address, zip_code } = locationData;

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
    if (newStreetAddress && newZipCode) {
      const fetchLocationData = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(street_address)},${encodeURIComponent(zip_code)}&key=${apiKeyGeo}`
          );
          const geoCodeData = await response.json();
          console.log("new geocode!");

          if (geoCodeData.results.length > 0) {
            setGeoLocationData(geoCodeData.results[0].geometry.location);
          } else {
            setError('No location data found');
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
          setError('Error fetching location data');
        }
      };
      fetchLocationData();
    }
  }, [street_address, zip_code, apiKeyGeo]);





  useEffect(() => {
    if (geoLocationData) {
      // Define the callback function globally
      window.initGoogleMap = () => {
        googleMap = new window.google.maps.Map(googleMapRef.current, {
          center: { lat: geoLocationData.lat, lng: geoLocationData.lng },
          zoom: 15,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: true,
        });
  
        new window.google.maps.Marker({
          position: geoLocationData,
          map: googleMap,
        });
      };
  
      // Check if the script is already loaded
      if (!window.googleMapsScriptLoaded) {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initGoogleMap`;
        googleMapScript.async = true;
        window.document.body.appendChild(googleMapScript);
        window.googleMapsScriptLoaded = true;
      } else {
        // If the script is already loaded, just initialize the map
        window.initGoogleMap();
      }
  
      return () => {
        // Clean up the global function
        delete window.initGoogleMap;
      };
    }
  }, [geoLocationData, googleMapApiKey]);




  

  if (error) {
    return <div lassName='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400'>{error}</div>;
  }

  if (!geoLocationData) {
    return <div className='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400'>Loading Location Data...</div>;
  }


  return <div ref={googleMapRef} style={{ width: '400px', height: '100%' }} />;
};

export default GoogleMap;