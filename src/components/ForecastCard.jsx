import React from 'react';

const ForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
            {forecast.forecastday.map((day) => (
                <div key={day.date} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', width: '120px' }}>
                    <p><strong>{day.date}</strong></p>
                    <img src={day.day.condition.icon} alt="Weather Icon" />
                    <p>{day.day.avgtemp_c}°C</p>
                    <p>{day.day.condition.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ForecastCard;
