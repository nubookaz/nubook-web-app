import React, { useRef, useState, useEffect } from 'react';


const GoogleMap = ({ locationData }) => {


  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true); 
  }, []);

  const [mapError, setMapError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const googleMapApiKey = window.GoogleMapApi;

  const createMarker = (position, iconUrl, label) => {
    const marker = new window.google.maps.Marker({
      position,
      map: window.googleMap,
      icon: { url: iconUrl, labelOrigin: new window.google.maps.Point(20, -20) },
      label: { text: label, color: '#C70E20', fontWeight: 'bold', fontSize: '14px' }
    });
    markersRef.current.push(marker);
    return marker;
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  
    const bounds = new window.google.maps.LatLngBounds();
  
    // Function to add marker and extend bounds
    const addMarkerAndUpdateBounds = (lat, lng, iconUrl, label) => {
      const position = new window.google.maps.LatLng(lat, lng);
      const marker = createMarker(position, iconUrl, label);
      bounds.extend(marker.getPosition());
    };
  
    const locationAddress =  locationData.location.address.street_address + ' ' + locationData.location.address.city + ' ' +  locationData.location.address.state + ', ' + locationData.location.address.zip_code

    // Add new markers for location, parking, and hospital
    if (locationData?.location?.address?.latitude && locationData?.location?.address?.longitude) {
      addMarkerAndUpdateBounds(locationData.location.address.latitude, locationData.location.address.longitude, 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', locationData.location.name || locationAddress );
    }
  
    if (locationData?.parking?.address?.latitude && locationData?.parking?.address?.longitude) {
      addMarkerAndUpdateBounds(locationData.parking.address.latitude, locationData.parking.address.longitude, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', locationData.parking.name || 'Parking Area');
    }
  
    if (locationData?.hospital?.address?.latitude && locationData?.hospital?.address?.longitude) {
      addMarkerAndUpdateBounds(locationData.hospital.address.latitude, locationData.hospital.address.longitude, 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', locationData.hospital.name || 'Hospital');
    }
  
    // Fit the map to the new marker bounds
    if (!bounds.isEmpty()) {
      window.googleMap.fitBounds(bounds);
      // Listener to adjust zoom level after bounds change
      const listener = window.google.maps.event.addListenerOnce(window.googleMap, 'bounds_changed', function() {
        if (this.getZoom() > 14) {
          this.setZoom(14);
        }
      });
    }
  };
  

  const loadGoogleMapScript = (callback) => {
    if (!window.googleMapsScriptLoaded) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initGoogleMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = callback;
      googleMapScript.onerror = () => {
        console.error('Error loading Google Maps script');
        setMapError('Failed to load the Google Maps script.');
      };
      document.body.appendChild(googleMapScript);
      window.googleMapsScriptLoaded = true;
      window.initGoogleMap = callback;
    } else {
      callback();
    }
  };


  const initializeMap = () => {
    try {

      const mapCenter = locationData?.location?.address?.latitude && locationData?.location?.address?.longitude 
      ? { lat: locationData.location.address.latitude, lng: locationData.location.address.longitude }
      : { lat: 0, lng: 0 }; 


      if (googleMapRef.current && !window.googleMap) {
        window.googleMap = new window.google.maps.Map(googleMapRef.current, {
          center: mapCenter,
          zoom: zoomLevel,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: true,
        });

        // Add listeners for zoom and center changes
        window.googleMap.addListener('zoom_changed', () => {
          setZoomLevel(window.googleMap.getZoom());
        });
      }
  
      // Update markers on the map
      updateMarkers();
    } catch (error) {
      console.error('Google Map initialization error:', error);
      setMapError('Failed to initialize the Google Map.');
    }
  };
 

  useEffect(() => {
    if (locationData && locationData?.location && locationData?.location?.address?.latitude && locationData?.location?.address?.longitude) {
      loadGoogleMapScript(initializeMap);
    } else {
      console.log('Invalid or incomplete location data:', locationData);
    }
  }, [locationData]);

  if (mapError) {
    return <div className='error-message'>{mapError}</div>;
  }

 

  if (!locationData || !locationData?.location || !locationData?.location?.address?.latitude || !locationData?.location?.address?.longitude) {
    return (
      <div className='bg-slate-50 flex flex-col gap-8 text-center text-slate-400 justify-center items-center h-full w-full'>
        <img src='/images/svg_images/location.svg' alt="" className='saturate-0 opacity-[.15] w-[10rem]' />
        Map unavailable. <br/> Enter location data to view the map.
      </div>
    );
  }

  return <div className={`fade-in ${fadeIn ? 'opacity-1' : 'opacity-0'}`} ref={googleMapRef} style={{ width: '100%', height: '100%' }} />;
};

export default GoogleMap;
