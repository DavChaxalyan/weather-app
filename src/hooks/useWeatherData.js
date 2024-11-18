import { useState, useEffect } from 'react';
import axios from 'axios';

export const useWeatherData = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8de2a66998ece5d1efc05efef9111f41&units=metric`
        );
        setWeather(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading };
};
