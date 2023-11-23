import { useState, useEffect } from 'react';

const Geocoding = (streetAddress, zipCode, country, setLocationData, setError) => {
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (!streetAddress && !zipCode) {
        setError('Address or zip code is required');
        return;
      }
  
      const fetchLocationData = async () => {
        setLoading(true);
        setError(null);
        setLocationData(null);
  
        try {
          // ... Fetching logic
          if (data.results.length > 0) {
            setLocationData(data.results[0].geometry.location);
          } else {
            setError('No results found');
          }
        } catch (error) {
          setError('Error fetching location data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchLocationData();
    }, [streetAddress, zipCode, country, setLocationData, setError]);
  
    return { loading };
  };
  
export default Geocoding;
