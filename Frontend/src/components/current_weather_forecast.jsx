import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ data, location }) => {
  if (!data || !location) return null;

  const { name, country } = location;
  const { temp_c, condition, feelslike_c, maxtemp_c, mintemp_c, wind_kph, humidity, uv } = data;

  return (
    <div className="current-weather">
      <h2 className="location">📍 {name}, {country}</h2>
      <p className="condition">🌤️ {condition.text}</p>
      <div className="temp">🌡️ {temp_c}°C</div>
      <p className="feels-like">🤔 Feels like: {feelslike_c}°C</p>
      
      <div className="weather-details">
        <div>⬆️ <span>High:</span> {maxtemp_c}°C</div>
        <div>⬇️ <span>Low:</span> {mintemp_c}°C</div>
        <div>💨 <span>Wind:</span> {wind_kph} kph</div>
        <div>💧 <span>Humidity:</span> {humidity}%</div>
        <div>☀️ <span>UV:</span> {uv}</div>
      </div>
    </div>
  );
};

export default CurrentWeather;