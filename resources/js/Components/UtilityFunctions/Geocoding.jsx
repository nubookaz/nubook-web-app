
    export const fetchGeocodeData = async (street_address, zip_code) => {
      const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
      const apiKeyGeo = window.GoogleMapApi;
 
      // Basic input validation
      if (!street_address || !zip_code) {
        throw new Error('Invalid address or zip code');
      }
    
      try {
        const response = await fetch(
          `${baseUrl}?address=${encodeURIComponent(street_address)},${encodeURIComponent(zip_code)}&key=${apiKeyGeo}`
        );
    
        const data = await response.json();
        
        if (data.status !== 'OK') {
          throw new Error(data.error_message || 'Failed to fetch geocode data');
        }
    
        return data.results.length > 0 ? data.results[0].geometry.location : null;
      } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
      }
    };
    

