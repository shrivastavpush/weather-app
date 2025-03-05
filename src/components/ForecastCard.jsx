import React from "react";
import { Grid, Card, Typography } from "@mui/material";

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  const forecastCardStyle = {
    width: "100%",
    borderRadius: 3,
    boxShadow: 3,
    background: "linear-gradient(135deg, #478ed1 30%, #42a5f5 90%)",
    color: "white",
    textAlign: "center",
    p: 3,
    mt: 2,
  };

  const daysCardStyle = {
    bgcolor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: 2,
    width: 120,
    p: 2,
    textAlign: "center",
    backdropFilter: "blur(8px)",
    boxShadow: 2,
  };

  return (
    <Card variant="outlined" sx={forecastCardStyle}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        7-Day Forecast
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {forecast.forecastday.map((day) => (
          <Grid item key={day.date}>
            <Card sx={daysCardStyle}>
              <Typography variant="body2" fontWeight="bold">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Typography>
              <img src={day.day.condition.icon} alt="Weather Icon" width="50" />
              <Typography variant="h6">{day.day.avgtemp_c}°C</Typography>
              <Typography variant="caption">
                {day.day.condition.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ForecastCard;
