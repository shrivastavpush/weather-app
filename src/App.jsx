import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';

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

  const boxStyle = {
    // display: 'flex',
    // flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    mt: 4
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Weather App
      </Typography>

      <SearchBox onCitySelect={setSelectedCity} />

      {loading && <Typography variant="body1" sx={{ mt: 2 }}>Loading weather data...</Typography>}

      <Box sx={boxStyle}>
        <WeatherCard weatherData={weatherData} />
        {weatherData && <ForecastCard forecast={weatherData.forecast} />}
      </Box>
    </Container>
  );
};

export default App;
