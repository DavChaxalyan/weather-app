import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import sunny from '../assets/sunny.json';
import rain from '../assets/rain.json';
import snow from '../assets/snow.json';
import Forecast from './Forecast';

function WeatherCard({city}) {
  const [weather, setWeather] = useState(null);

  const getAnimation = (weather) => {
    switch (weather) {
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      default:
        return sunny;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city || 'London'}&appid=8de2a66998ece5d1efc05efef9111f41&units=metric`
        );
        setWeather(res.data);
      } catch (error) {
        console.error('Ошибка загрузки данных погоды:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{weather.name}</h1>
        <span className="text-xl">{weather.main.temp}°C</span>
      </div>
      <div className="flex items-center justify-center mt-4">
        <Lottie animationData={getAnimation(weather.weather[0].main)} style={{ width: 150, height: 150 }} />
      </div>
      <p className="text-center mt-4 text-gray-600">{weather.weather[0].description}</p>

      {/* Добавляем Forecast */}
      <Forecast city={city} />
    </div>
  );
}

export default WeatherCard;


