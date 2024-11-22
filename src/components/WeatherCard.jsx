import React, { useEffect, useState } from 'react';
import Forecast from './Forecast';
import { fetchWeatherData } from '../services/fetchWeatherDatas';
import ErrorComponent from './ErrorComponent';

function WeatherCard({ city, theme }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  function getWeatherColor(weatherType) {
    switch (weatherType.toLowerCase()) {
      case "clear": 
        return `${theme === 'dark' ? 'bg-yellow-100' : 'bg-[#dfdf64]'} text-yellow-800 shadow-yellow-200`;
      case "clouds": 
        return `${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-300'} text-gray-800 shadow-gray-200`;
      case "rain":
        return `${theme === 'dark' ? 'bg-blue-100' : 'bg-blue-400'} text-blue-800 shadow-blue-200`;
      case "snow": 
        return `${theme === 'dark' ? 'bg-white' : 'bg-gray-200'} text-gray-700 shadow-gray-300`;
      case "thunderstorm": 
        return `${theme === 'dark' ? 'bg-purple-100' : 'bg-purple-400'} text-purple-900 shadow-purple-300`;
      case "drizzle": 
        return `${theme === 'dark' ? 'bg-blue-50' : 'bg-blue-300'} text-blue-600 shadow-blue-100`;
      default: 
        return `${theme === 'dark' ? 'bg-green-100' : 'bg-green-400'} text-green-800 shadow-green-200`;
    }
  }

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await fetchWeatherData(city);
        if (data.cod !== 200) { 
          setError('City not found. Please try another city.');
          setWeather(null); 
        } else {
          setWeather(data);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again later.');
        setWeather(null); 
      }
    };

    loadWeatherData();
  }, [city]);

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (!weather || !weather.weather || weather.weather.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div
  className={`transition-all duration-500 shadow-2xl rounded-3xl p-8 text-gray-800 ${getWeatherColor(
    weather.weather[0].main
  )}`}
>
  <div className="flex justify-between items-center">
    <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
      {weather.name}
    </h1>
    <span className="text-3xl font-bold text-blue-600 bg-blue-200 rounded-full px-4 py-2 shadow-md">
      {Math.floor(weather.main.temp)}°C
    </span>
  </div>

  <div className="flex items-center justify-center mt-8">
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
      alt="Weather icon"
      className="w-40 h-40 transition-transform transform scale-105 animate-scale-up duration-500"
    />
  </div>

  <p className="text-center mt-6 text-gray-700 text-xl italic capitalize">
    {weather.weather[0].description}
  </p>

  <div className="mt-6 border-t-2 border-blue-200"></div>

  <div className="mt-6">
    <Forecast city={city} />
  </div>
</div>

  );
}

export default WeatherCard;
