import React from 'react';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;

    const weatherDivStyle = {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        margin: '20px auto'
    }

    return (
        <div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={weatherDivStyle}>
            <h2>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country === "Inde"
                ? "India"
                : weatherData.location.country}
            </h2>
            <p>Local time : {weatherData.location.localtime}</p>
            <p>Temperature: {weatherData.current.temp_c}°C / {weatherData.current.temp_f} F</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Humidity: {weatherData.current.humidity}</p>
            <img src={weatherData.current.condition.icon} alt="Weather Icon" />
        </div>
    );
};

export default WeatherCard;
