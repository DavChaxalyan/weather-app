import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { fetchWeatherForecast } from '../services/fetchWeatherDatas';
import ErrorComponent from './ErrorComponent';

function Forecast({ city }) {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupedForecast, setGroupedForecast] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadForecastData = async () => {
      try {
        const data = await fetchWeatherForecast(city);
        if (!data || Object.keys(data).length === 0) {
          setError('City not found. Please try another city.');
        } else {
          setGroupedForecast(data);
          setSelectedDay(Object.keys(data)[0]);
          setError(null); 
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
        setError('Error fetching weather data. Please try again later.');
        setLoading(false);
      }
    };

    loadForecastData();
  }, [city]);

  if (loading) return <div className="text-center">Loading the forecast...</div>;

  if (error) return <ErrorComponent message={error} />;

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-2xl rounded-lg p-6 mt-6 text-gray-800">
      <h2 className="text-2xl font-extrabold text-blue-600 mb-6 text-center">
          The forecast for the next 7 days
      </h2>

      <div className="flex overflow-x-auto space-x-4 mb-6">
        {Object.keys(groupedForecast).map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-lg font-medium ${
              day === selectedDay
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {groupedForecast[selectedDay]?.map((item, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-200 hover:border-blue-400 hover:scale-105 transition-transform duration-300 p-6 rounded-lg flex justify-between items-center shadow-lg cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div>
              <p className="font-bold text-lg text-gray-700">
                {new Date(item.dt_txt).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {item.weather[0].description}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(item.main.temp)}°C
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-12 h-12 ml-4"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedItem && <Modal item={selectedItem} onClose={closeModal} />}
    </div>
  );
}

export default Forecast;
