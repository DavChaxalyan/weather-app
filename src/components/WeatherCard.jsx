import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Forecast from './Forecast';

function WeatherCard({ city, theme }) {
  const [weather, setWeather] = useState(null);

  function getWeatherColor(weatherType) {
    console.log(weatherType);
    
    switch (weatherType.toLowerCase()) {
      case "clear": 
        return `bg-yellow-${theme === 'dark' ? '100' : '400'} text-yellow-800 shadow-yellow-200`;
      case "clouds": 
      console.log("adasdasdasd");
      
        return `bg-gray-${theme === 'dark' ? '200' : '300'} text-gray-800 shadow-gray-200`;
      case "rain":
        return `bg-blue-${theme === 'dark' ? '100' : '400'} text-blue-800 shadow-blue-200`;
      case "snow": 
        return `bg-${theme === 'dark' ? 'white' : 'gray-200'} text-gray-700 shadow-gray-300`;
      case "thunderstorm": 
        return `bg-purple-${theme === 'dark' ? '100' : '400'} text-purple-900 shadow-purple-300`;
      case "drizzle": 
        return `bg-blue-${theme === 'dark' ? '50' : '300'} text-blue-600 shadow-blue-100`;
      default: 
        return `bg-green-${theme === 'dark' ? '100' : '400'} text-green-800 shadow-green-200`;
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city || 'London'}&appid=8de2a66998ece5d1efc05efef9111f41&units=metric`
        );
        setWeather(res.data);
      } catch (error) {
        console.error('Weather data loading error:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <div className="text-center">Loading...</div>;

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
