import React, { useRef, useState, useEffect } from 'react';




const GoogleMap = ({  locationData, parkingLocationData, hospitalLocationData, style  }) => {

  
  const googleMapRef = useRef(null);
  let googleMap;

  const googleMapApiKey = window.GoogleMapApi;

  const [error, setError] = useState(null);
  const [geoLocationData, setGeoLocationData] = useState(null);

  let { street_address, zip_code, latitude, longitude } = locationData || {};



  useEffect(() => {
    // Check if latitude and longitude are available in locationData
    if (latitude && longitude) {
      setGeoLocationData({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);




  if (locationData && locationData.film_location && locationData.film_location.location) {
      if (locationData.film_location.location.street_address) {
          street_address = locationData.film_location.location.street_address;
      }
      if (locationData.film_location.location.zip_code) {
          zip_code = locationData.film_location.location.zip_code;
      }
  }
 
  if (!locationData || !locationData.street_address || !locationData.zip_code) {
    // Render a div if locationData is empty
    return (
      <div className='flex flex-col justify-center w-full h-full items-center text-center bg-slate-50 text-slate-400 p-6 px-[5rem]'>
        <img src='/images/svg_images/location.svg' className='saturate-0 opacity-[.15] w-[10rem] mb-6' />
        Location data is not available. Please add a location to view it on the map.
      </div>
    );
  }

  useEffect(() => {
    const initializeMap = () => {
      // Convert lat and lng from string to float
      const latitude = parseFloat(geoLocationData.lat);
      const longitude = parseFloat(geoLocationData.lng);

      if (!isNaN(latitude) && !isNaN(longitude)) {
          googleMap = new window.google.maps.Map(googleMapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 14,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: true,
          });
  
          const mainLocationMarkerIcon = {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', 
            labelOrigin: new window.google.maps.Point(20, -20),
          };

 
          new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: googleMap,
              icon: mainLocationMarkerIcon,
              label: {
                text: 'Filming Location', 
                color: '#C70E20',  
                fontWeight: 'bold',
                fontSize: '14px',
              }
          });

          if (parkingLocationData && !isNaN(parkingLocationData.latitude) && !isNaN(parkingLocationData.longitude)) {
            const additionalLocation1 = { lat: parseFloat(parkingLocationData.latitude), lng: parseFloat(parkingLocationData.longitude) };
            const parkingMarkerIcon = {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
              labelOrigin: new window.google.maps.Point(20, -20),
            };
            new window.google.maps.Marker({
              position: additionalLocation1,
              map: googleMap,
              icon: parkingMarkerIcon,
              label: {
                text: 'Parking Location', 
                color: '#C70E20',  
                fontWeight: 'bold',
                fontSize: '14px',
              }
            });
          }

          if (hospitalLocationData && !isNaN(hospitalLocationData.latitude) && !isNaN(hospitalLocationData.longitude)) {
            const additionalLocation2 = { lat: parseFloat(hospitalLocationData.latitude), lng: parseFloat(hospitalLocationData.longitude) };
            const hospitalMarkerIcon = {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', 
              labelOrigin: new window.google.maps.Point(20, -20),
            };
            new window.google.maps.Marker({
              position: additionalLocation2,
              map: googleMap,
              icon: hospitalMarkerIcon,
              label: {
                text: 'Hospital Location', 
                color: '#C70E20',  
                fontWeight: 'bold',
                fontSize: '14px',
              }         
            });
          }

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
    return <div className='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400 p-6'>{error}</div>;
  }

  if (!geoLocationData) {
    return <div className='flex justify-center w-full h-full items-center bg-slate-50 text-slate-400 p-6'>Loading Location Data...</div>;
  }


  return <div ref={googleMapRef} style={style} />;
};

export default GoogleMap;