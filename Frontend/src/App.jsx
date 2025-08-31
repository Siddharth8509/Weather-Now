import './App.css';
import { useEffect, useState } from 'react';
import { getWeatherData } from './api';
import { parse } from "date-fns";

import SearchBar from './components/searchbar';
import CurrentWeather from './components/current_weather_forecast';
import WeeklyForecast from './components/weekly_weather_forecast';
import HourlyForeCast from './components/hourly_weather_forecast';
import logo from './assets/Logo.svg';

function App() {
  const [city , setCity] = useState('Aukland');
  const [weatherData , setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* Determine current hour */
  const hour = weatherData?.location?.localtime
    ? parse(weatherData.location.localtime, 'yyyy-MM-dd HH:mm', new Date()).getHours()
    : new Date().getHours();

  /* Fetch weather data */
  useEffect(() => {
    const FetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherData(city);
        const { mintemp_c , maxtemp_c} = data.forecast.forecastday[0].day;

        setWeatherData({
          current: { ...data.current , mintemp_c , maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        });
      } catch (err) {
        setError(`Error: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };

    FetchWeather();
  }, [city]);

  return (
    <div className="app">
      {/* Background layers */}
      <div className="bg-sunrise" style={{ opacity: hour >= 5 && hour < 9 ? 1 : 0 }}></div>
      <div className="bg-day" style={{ opacity: hour >= 9 && hour < 17 ? 1 : 0 }}></div>
      <div className="bg-sunset" style={{ opacity: hour >= 17 && hour < 20 ? 1 : 0 }}></div>
      <div className="bg-night" style={{ opacity: hour < 6 || hour >= 20 ? 1 : 0 }}></div>

      <div className="container">
        <div className="search-logo-wrapper">
  <img src={logo} alt="Logo" className="app-logo" />
  <SearchBar onSearch={setCity} />
  <a
    href="https://github.com/yourusername/your-repo"
    target="_blank"
    rel="noopener noreferrer"
    className="github-button"
  >
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
      alt="GitHub"
      className="github-icon"
    />
  </a>
</div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            {/* Top section: Current + Weekly side by side */}
            <div className="top-forecast">
              <CurrentWeather data={weatherData.current} location={weatherData.location}/>
              <section className="forecast-section weekly-side">
                <WeeklyForecast data={weatherData.weekly}/>
              </section>
            </div>

            {/* Bottom section: Hourly scrollable forecast */}
            <section className="forecast-section">
              <HourlyForeCast data={weatherData.hourly}/>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
