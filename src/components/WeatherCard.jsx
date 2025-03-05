import { Card, Typography, Divider, Box } from '@mui/material';
import React from 'react';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;

    const weatherCardStyle = {
        width: 350,
        borderRadius: 3,
        boxShadow: 3,
        background: 'linear-gradient(135deg, #42a5f5 30%, #478ed1 90%)',
        color: 'white',
        textAlign: 'center',
        p: 3,
    }

    return (
        <Card variant="outlined" sx={weatherCardStyle} >
            {/* Location */}
            <Typography variant="h5" fontWeight="bold">
                {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country === "Inde" ? "India" : weatherData.location.country}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Local time: {weatherData.location.localtime}
            </Typography>

            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.4)' }} />

            {/* Weather Icon & Temperature */}
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <img src={weatherData.current.condition.icon} alt="Weather Icon" width="80" />
                <Typography variant="h3" fontWeight="bold">
                    {weatherData.current.temp_c}°C
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    {weatherData.current.condition.text}
                </Typography>
            </Box>

            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.4)' }} />

            {/* Additional Weather Details */}
            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Humidity: {weatherData.current.humidity}%</Typography>
                <Typography variant="body2">Wind: {weatherData.current.wind_kph} km/h</Typography>
            </Box>
        </Card>
    );
};

export default WeatherCard;
