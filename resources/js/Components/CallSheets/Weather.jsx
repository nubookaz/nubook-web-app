import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCaretUp, faCaretDown, faSun } from '@fortawesome/free-solid-svg-icons';

const Weather = ({ street_address, zip_code, date, country }) => {


  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState(null);
  const apiKeyGeo = 'AIzaSyDKDDy79SZdsmJ9wY7YjOGP5U3YPNioSdU';
  const apiKey = '2fddf0abeecb6640ae37fdf8735cb722';

  if (!street_address && !zip_code) {
    return <div className='grid place-content-center my-auto h-full'>No Weather Information Available. Please provide a location with a street address or zip code.</div>;
  }

  
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            street_address
          )},${encodeURIComponent(zip_code)},${encodeURIComponent(country)}&key=${apiKeyGeo}`
        );


        const data = await response.json();

        if (data.results.length > 0) {
          setLocationData(data.results[0].geometry.location);
        } else {
          setLocationData(null);
          console.log('locationData:', data);

        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setError('Error fetching location data');
      }
    };

    fetchLocationData();
  }, [apiKey, street_address, zip_code, country]);



  useEffect(() => {
    const fetchWeatherData = async () => {

      try {
        // Ensure locationData is available before making the API call
        if (locationData) {
          let endpoint;

          // If the specified date is in the future, use historical weather data
          if (new Date(date) > new Date()) {
            // Convert the date to a UNIX timestamp (in seconds)
            const timestamp = Math.floor(new Date(date).getTime() / 1000);

            endpoint = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${locationData.lat}&lon=${locationData.lng}&dt=${timestamp}&appid=${apiKey}`;
          } else {
            // Fetch current weather data
            endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lng}&units=metric&appid=${apiKey}`;
          }

          const response = await fetch(endpoint);
          const data = await response.json();
 
          setWeatherData(data);
        }  
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
      } finally {
        setLoadingWeather(false);
      }

    };

  if (locationData !== null) {
      fetchWeatherData();
    } 
  }, [apiKey, locationData, date]);


  if (loadingWeather) {
    return <div className='grid place-content-center my-auto h-full'>Loading...</div>;
  } 

  if (error) {
    return <div>Error fetching weather data</div>;
  }

  if (!weatherData || !weatherData.main) {
    return <div>No weather data available</div>;
  }

  const { main, sys } = weatherData;

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const temperatureF = celsiusToFahrenheit(main.temp);




  return (
    <div className='flex flex-row gap-8 justify-between'>
      <div className='m-auto'>
        <FontAwesomeIcon className="text-[5rem] text-yellow-400" icon={faSun} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold'>
            High: <span className='font-normal'>{temperatureF}°F</span>
        </p>
        <p className='font-bold'>
            Low: <span className='font-normal'>{temperatureF}°F</span>
        </p>
        <p className='flex flex-row gap-2'><FontAwesomeIcon className="my-auto" icon={faCaretUp} /> Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        <p className='flex flex-row gap-2'><FontAwesomeIcon className="my-auto" icon={faCaretDown} /> Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
      </div>

    </div>
  );
};


 
export default Weather;
