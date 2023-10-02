import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Weather = ({ apiKey, street_address, zip_code, date, country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState(null);
  const apiKeyGeo = 'AIzaSyBNC8qqe2LUc7uvF41Q84DjTrsEvgEIu-c';

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
          console.log('Weather Data:', data);
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
      } finally {
        setLoadingWeather(false);
      }
    };

    // Ensure locationData is available before fetching weather data
    if (locationData !== null) {
      fetchWeatherData();
    }
  }, [apiKey, locationData, date]);

  if (loadingWeather) {
    return <div>Loading...</div>;
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
    <div>
      <p>Temperature: {temperatureF.toFixed(2)}°F</p>
      <p>High: {main.temp_max.toFixed(2)}°C</p>
      <p>Low: {main.temp_min.toFixed(2)}°C</p>
      <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
      <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
    </div>
  );
};

Weather.propTypes = {
  apiKey: PropTypes.string.isRequired,
  street_address: PropTypes.string.isRequired,
  zip_code: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  country: PropTypes.string,
};

export default Weather;
