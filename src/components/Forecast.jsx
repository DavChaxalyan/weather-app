import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Forecast({ city }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8de2a66998ece5d1efc05efef9111f41&units=metric`
        );
        setForecast(res.data.list.slice(0, 5)); 
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных прогноза:', error);
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <div className="text-center">Загрузка прогноза...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Прогноз на ближайшие дни</h2>
      <div className="grid grid-cols-2 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md"
          >
            <div>
              <p className="font-semibold">{new Date(item.dt_txt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">{item.weather[0].description}</p>
            </div>
            <div className="text-lg font-bold">{Math.round(item.main.temp)}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
