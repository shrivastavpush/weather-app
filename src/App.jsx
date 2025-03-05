import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import axios from 'axios';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://weatherapi-com.p.rapidapi.com/forecast.json',
          {
            params: { q: selectedCity, days: "7" },
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
              'x-rapidapi-host': import.meta.env.VITE_WEATHERAPI_HOST,
            },
          }
        );
        setWeatherData(response.data);
        console.log("weatherData", response.data.forecast.forecastday[0]);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', padding: '20px' }}
    >
      <h1>Weather App</h1>
      <SearchBox onCitySelect={setSelectedCity} />
      {loading && <p>Loading weather data...</p>}
      <WeatherCard weatherData={weatherData} />
      {weatherData && <ForecastCard forecast={weatherData.forecast} />}
    </div>
  );
};

export default App;
