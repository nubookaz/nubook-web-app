import React, { useRef, useState, useEffect } from 'react';


const GoogleMap = ({ locationData, mapKey }) => {

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true); 
  }, []);

  const [mapError, setMapError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const googleMapApiKey = window.GoogleMapApi;

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptLoading, setIsScriptLoading] = useState(false);



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
      if (!window.googleMap) {
          console.error('Map is not initialized');
          return;
      }

      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    
      const bounds = new window.google.maps.LatLngBounds();
    
      const addMarkerAndUpdateBounds = (lat, lng, iconUrl, label) => {
          if(lat != null && lng != null) {
              const position = new window.google.maps.LatLng(lat, lng);
              const marker = createMarker(position, iconUrl, label);
              bounds.extend(marker.getPosition());
          }
      };
    

      const locationAddress = locationData?.location?.address ? 
          `${locationData.location.address.street_address || ''} 
          ${locationData.location.address.city || ''} 
          ${locationData.location.address.state || ''}, 
          ${locationData.location.address.zip_code || ''}` :
          undefined;
    
      if (locationData?.location?.address?.latitude && locationData?.location?.address?.longitude) {
          addMarkerAndUpdateBounds(locationData.location.address.latitude, locationData.location.address.longitude, 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', locationData.location.name || locationAddress);
      }

      // Add markers for parking
      if (locationData?.parking?.address?.latitude && locationData?.parking?.address?.longitude) {
          addMarkerAndUpdateBounds(locationData.parking.address.latitude, locationData.parking.address.longitude, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', locationData.parking.name || 'Parking Area');
      }

      // Handling both new and existing hospital data
      let hospitalData = locationData.hospital?.address || locationData.hospital;
      if (!hospitalData) {
          // For existing data structure
          hospitalData = locationData.hospital;
      }

      const hospitalLat = hospitalData?.latitude;
      const hospitalLng = hospitalData?.longitude;

  
      if (hospitalLat && hospitalLng) {
          addMarkerAndUpdateBounds(hospitalLat, hospitalLng, 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', locationData.hospital.name || 'Hospital');
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
  
  const loadGoogleMapScript = () => {
      // Check if the Google Maps script is already loaded
      if (window.googleMapsScriptLoaded) {
          setIsScriptLoaded(true);
          return;
      }

      // Check if the script is currently loading to avoid loading it multiple times
      if (!isScriptLoading) {
          setIsScriptLoading(true);
          const scriptId = 'google-maps-script';

          // Check if the script tag already exists
          if (!document.getElementById(scriptId)) {
              const googleMapScript = document.createElement('script');
              googleMapScript.id = scriptId; // Assign an ID to the script tag
              googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initGoogleMap`;
              googleMapScript.async = true;
              googleMapScript.defer = true;
              googleMapScript.onload = () => {
                  window.googleMapsScriptLoaded = true;
                  setIsScriptLoaded(true);
                  setIsScriptLoading(false);
              };
              googleMapScript.onerror = (error) => {
                  console.error('Error loading Google Maps script', error);
                  setMapError('Failed to load the Google Maps script.');
                  setIsScriptLoading(false);
              };
              document.body.appendChild(googleMapScript);
          } else {
              // The script is already in the process of loading
              setIsScriptLoaded(true);
              setIsScriptLoading(false);
          }
      }
  };

    const initializeMap = () => {
 
        try {
          let lat, lng;
 
          // Check for both new and edit entry structures
          if (typeof locationData?.location?.address?.latitude !== 'undefined' && 
              typeof locationData?.location?.address?.longitude !== 'undefined') {
              lat = parseFloat(locationData.location.address.latitude);
              lng = parseFloat(locationData.location.address.longitude);
          } else if (typeof locationData?.location?.latitude !== 'undefined' && 
                    typeof locationData?.location?.longitude !== 'undefined') {
              lat = parseFloat(locationData.location.latitude);
              lng = parseFloat(locationData.location.longitude);
          } else {
              // Default values or error handling
              lat = 33.5387; // Default latitude
              lng = -112.1863; // Default longitude
          }


          const isLatValid = !isNaN(lat) && lat >= -90 && lat <= 90;
          const isLngValid = !isNaN(lng) && lng >= -180 && lng <= 180;
      
          if (!isLatValid || !isLngValid) {
              throw new Error('Invalid latitude or longitude');
          }
      
          const mapCenter = { lat, lng };
      
          // If map already exists, clear existing markers
          if (window.googleMap) {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
          } else {
              // Initialize map if it doesn't exist
              window.googleMap = new window.google.maps.Map(googleMapRef.current, {
                  center: mapCenter,
                  zoom: zoomLevel,
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: false,
                  fullscreenControl: true,
              });

              window.googleMap.addListener('zoom_changed', () => {
                  setZoomLevel(window.googleMap.getZoom());
              });
          }

          // Create markers based on new locationData
          updateMarkers();
        } catch (error) {
            console.error('Google Map initialization error:', error);
            setMapError('Failed to initialize the Google Map.');
        }
    };


    useEffect(() => {
        window.initGoogleMap = initializeMap;
    }, []);

    useEffect(() => {
        if (!window.googleMap && locationData?.location?.address?.latitude && locationData?.location?.address?.longitude) {
            loadGoogleMapScript(); // Load script and initialize the map if not already loaded
        }
    }, [locationData, mapKey]); // Modified to re-run when locationData changes
    
    useEffect(() => {
        if (isScriptLoaded && locationData) {
            initializeMap(); // Initialize or update the map when script is loaded or locationData changes
        }
    }, [isScriptLoaded, locationData, mapKey]); // Modified to include locationData as a dependency
    
    useEffect(() => {
        if (window.googleMap && locationData) {
            updateMarkers(); // Update markers when locationData changes
        }
    }, [locationData, mapKey]); // New useEffect for updating markers

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
