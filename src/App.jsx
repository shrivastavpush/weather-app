import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';

const getBackgroundGradient = (condition) => {
    switch (condition) {
        case 'Mist':
            return 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)';
        case 'Sunny':
            return 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
        case 'Clear':
            return 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
        case 'Cloudy':
            return 'linear-gradient(to top, #bdc3c7 0%, #2c3e50 100%)';
        case 'Rain':
            return 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)';
        case 'Snow':
            return 'linear-gradient(to top, #e6dada 0%, #274046 100%)';
        case 'Thunderstorm':
            return 'linear-gradient(to top, #1e3c72 0%, #2a5298 100%)';
        default:
            return 'linear-gradient(135deg, rgb(40, 38, 37) 0%, rgb(119, 119, 119) 100%)';
    }
};

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
                console.log("weatherData", response.data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
            setLoading(false);
        };

        fetchWeather();
    }, [selectedCity]);

    const boxStyle = {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        mt: 4
    }

    return (
        <Box alignItems={'center'} sx={{
            height: '100vh',
            background: weatherData
                ? getBackgroundGradient(weatherData.current.condition.text)
                : 'linear-gradient(135deg, rgb(40, 38, 37) 0%, rgb(119, 119, 119) 100%)'
        }}>
            <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Weather App
                </Typography>

                <SearchBox onCitySelect={setSelectedCity} />

                {loading && <Typography variant="body1" sx={{ mt: 2 }}>Loading weather data...</Typography>}
            </Container>
            <Box sx={boxStyle}>
                <WeatherCard weatherData={weatherData} />
                {weatherData && <ForecastCard forecast={weatherData.forecast} />}
            </Box>
        </Box>
    );
};

export default App;
