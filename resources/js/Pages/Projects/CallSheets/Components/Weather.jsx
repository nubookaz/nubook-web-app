import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCaretDown, faCaretUp, faSun } from '@fortawesome/free-solid-svg-icons';




const Weather = ({ date, data, locationData, layoutStyle = 'landscape' }) => {

  let { latitude, longitude } = locationData || {};
 
  const [weatherData, setWeatherData] = useState(null);
 
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = window.OpenWeatherApi;

  const currentDate = new Date(); 

 
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoadingWeather(true);
  
      // Function to check if a value is neither null nor empty
      const isValidCoordinate = (value) => value != null && value !== '';
  
         if (data && data.weather && typeof data.weather === 'string') {
          handleJSONWeatherData(data);
        } else if (isValidCoordinate(latitude) && isValidCoordinate(longitude)) {
          handleFetchWeatherData(latitude, longitude, date, apiKey);
        }
 
    };
  
    fetchWeatherData();
  }, [latitude, longitude, data, date, apiKey]); // Update dependencies
  


  const handleJSONWeatherData = (data) => {
    try {
      // Parse the JSON string to an object
      const weatherObject = JSON.parse(data.weather);
      setWeatherData(weatherObject);
    } catch (error) {
      console.error('Error parsing weather data:', error);
      setError('Error parsing weather data');
    } finally {
      setLoadingWeather(false);
    }
  };
  

  const handleFetchWeatherData = async (latitude, longitude, date, apiKey) => {
    try {
      let endpoint;
   
      const currentDate = new Date();
      const targetDate = new Date(date);
  
      if (targetDate > currentDate) {
        // Check if the date is 8 days or more in the future
        const timeDifference = (targetDate - currentDate) / (1000 * 60 * 60 * 24);
        const timestamp = Math.floor(targetDate.getTime() / 1000);
  
        if (timeDifference >= 5) {
          // Convert the date to a UNIX timestamp (in seconds)
          endpoint = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${latitude}&lon=${longitude}&date=${date}&appid=${apiKey}`;
        } else {
          // Fetch current weather data if the target date is less than 8 days in the future
          endpoint = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${timestamp}&appid=${apiKey}`;
        }
      } else {
        // If the target date is in the past, fetch current weather data
        endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      }
  
      const response = await fetch(endpoint);
      const responseData = await response.json();
      setWeatherData(responseData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    } finally {
      setLoadingWeather(false);
    }
  };
  
  

  useEffect(() => {
    const postData = async () => {
      if (weatherData) {
        try {
          const routeUrl = route('save.weather', { id: data.project_id, callSheetId: data.id });
          const response = await axios.post(routeUrl, {
              weatherData,
          });

          if (response.data.success) {
           }
        } catch (error) {
          console.error('Error posting weather data:', error);
        }
      }
    };

    postData();
  }, [weatherData]);


 
  useEffect(() => {
    // Simulate loading for 2 seconds, replace this with your actual fetch logic
    const timer = setTimeout(() => {
      setLoadingWeather(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);


  if (!latitude && !longitude) {
    return <div className="flex justify-center items-center text-center w-full h-full p-6">No weather data available. Please enter a valid address or zip code</div>;
  }

 
  if (loadingWeather) {
    return <div className="flex justify-center items-center text-center w-full h-full p-6">Loading...</div>;
  }
  
  if (error) {
    return <div className="flex justify-center items-center text-center w-full h-full p-6">Error fetching weather data</div>;
  }
  
  if (!weatherData) {
    return <div className="flex justify-center items-center text-center w-full h-full p-6">No weather data available. Please enter a valid address or zip code</div>;
  }
  
  let temperatureC, temperatureF, maxTempC, maxTempF, minTempC, minTempF, sunsetTime, sunriseTime, message;
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const kelvinToFahrenheit = (kelvin) => {
    const celsius = kelvin - 273.15;
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit;
  };




  if (weatherData.main) {
    const { main, sys, dt } = weatherData;
    // Convert Celsius to Fahrenheit
    if (main && main.temp) {
      temperatureC = main.temp;
      temperatureF = celsiusToFahrenheit(temperatureC);
    }
    if (main && main.temp_max) {
      maxTempC = main.temp_max;
      maxTempF = celsiusToFahrenheit(maxTempC);
    }
    if (main && main.temp_min) {
      minTempC = main.temp_min;
      minTempF = celsiusToFahrenheit(minTempC);
    }
    const weatherDate = new Date(dt * 1000); // Convert timestamp to milliseconds
  
    if (currentDate <= weatherDate && currentDate.getTime() + 8 * 24 * 60 * 60 * 1000 >= weatherDate.getTime()) {
      // Weather data is for today to 8 days in the future
      sunsetTime = sys && sys.sunset ? new Date(sys.sunset * 1000).toLocaleTimeString() : "N/A";
      sunriseTime = sys && sys.sunrise ? new Date(sys.sunrise * 1000).toLocaleTimeString() : "N/A";
      message = "Date is within the next 8 days.";
    } else {
      // Weather data is for dates more than 8 days in the future or in the past
      sunsetTime = sys && sys.sunset ? new Date(sys.sunset * 1000).toLocaleTimeString() : "N/A";
      sunriseTime = sys && sys.sunrise ? new Date(sys.sunrise * 1000).toLocaleTimeString() : "N/A";
      message = "Date is more than 8 days in the future or in the past.";
    }



  } else if (weatherData.temperature) {
    const { temperature, date } = weatherData;
    // Use afternoon temperature as default
    if (temperature && temperature.afternoon) {
      temperatureC = temperature.afternoon;
      temperatureF = kelvinToFahrenheit(temperatureC);
    }
    if (temperature && temperature.max) {
      maxTempC = temperature.max;
      maxTempF = kelvinToFahrenheit(maxTempC);
    }
    if (temperature && temperature.min) {
      minTempC = temperature.min;
      minTempF = kelvinToFahrenheit(minTempC);
    }
    sunsetTime = "N/A";
    sunriseTime = "N/A";
    message = "Date is more than 8 days in the past (defaulting to afternoon temperature).";




  } else if (weatherData.data && weatherData.data.length > 0) {
  const data = weatherData.data[0];
    if (data && data.temp) {
      temperatureC = data.temp;
      temperatureF = kelvinToFahrenheit(temperatureC); // Use kelvinToFahrenheit here
    }
    if (data && data.maxTemp) {
      maxTempC = data.maxTemp;
      maxTempF = kelvinToFahrenheit(maxTempC); // Use kelvinToFahrenheit here
    }
    if (data && data.minTemp) {
      minTempC = data.minTemp;
      minTempF = kelvinToFahrenheit(minTempC); // Use kelvinToFahrenheit here
    }
    if (data && data.sunset) {
      sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString();
    } else {
      sunsetTime = "N/A";
    }
    if (data && data.sunrise) {
      sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString();
    } else {
      sunriseTime = "N/A";
    }
    message = "Date is based on the 'data' object.";
}
    
  

  return (

    <>
       {layoutStyle === 'portrait' ? (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-6 w-full h-full'>
              <div className='text-[4rem] text-center my-auto'>
                  <FontAwesomeIcon icon={faSun} className="text-yellow-400 text-[4rem]" />
              </div>
              <div className='h-full flex text-left flex-col my-auto'>
                  <p className='font-bold'>Temp: <span className='font-normal'>{temperatureF ? temperatureF.toFixed(2) + "°F" : "N/A"}</span></p>
                  <p className='font-bold'>High: <span className='font-normal'>{maxTempF ? maxTempF.toFixed(2) + "°F" : "N/A"}</span></p>
                  <p className='font-bold'>Low: <span className='font-normal'>{minTempF ? minTempF.toFixed(2) + "°F" : "N/A"}</span></p>              
              </div>
            </div>
            <div className='flex flex-col  w-full'>
                <div className='flex flex-row gap-2 justify-center'>
                  <FontAwesomeIcon icon={faCaretUp} className="text-lg text-yellow-600 my-auto" />
                  <p className='font-bold'>
                    Sunrise: <span className='font-normal'>{sunriseTime}</span>
                  </p>
                </div>
                <div className='flex flex-row gap-2 justify-center'>
                  <FontAwesomeIcon icon={faCaretDown} className="text-lg text-yellow-600 my-auto" />
                  <p className='font-bold'>
                    Sunset: <span className='font-normal'>{sunsetTime}</span>
                  </p>
                </div>
            </div>
          </div>
         
        ):(
          <div className='flex flex-row gap-6 w-full h-full'>
            <div className='text-[4rem] text-center my-auto w-[40%]'>
                <FontAwesomeIcon icon={faSun} className="text-yellow-400 my-auto" />
            </div>
            <div className='w-[60%] h-full'>
                <p className='font-bold'>Temp: <span className='font-normal'>{temperatureF ? temperatureF.toFixed(2) + "°F" : "N/A"}</span></p>
                <p className='font-bold'>High: <span className='font-normal'>{maxTempF ? maxTempF.toFixed(2) + "°F" : "N/A"}</span></p>
                <p className='font-bold'>Low: <span className='font-normal'>{minTempF ? minTempF.toFixed(2) + "°F" : "N/A"}</span></p>
                <div className='flex flex-row gap-2'>
                  <FontAwesomeIcon icon={faCaretUp} className="text-lg text-yellow-600 my-auto" />
                  <p className='font-bold'>
                    Sunrise: <span className='font-normal'>{sunriseTime}</span>
                  </p>
                </div>
                <div className='flex flex-row gap-2'>
                  <FontAwesomeIcon icon={faCaretDown} className="text-lg text-yellow-600 my-auto" />
                  <p className='font-bold'>
                    Sunset: <span className='font-normal'>{sunsetTime}</span>
                  </p>
                </div>
              
            </div>
          </div>
        )}
        
    </>
   
  );
  

};
 
export default Weather;
 