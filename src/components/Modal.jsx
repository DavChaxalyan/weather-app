import React from 'react';

const Modal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl transition-transform transform hover:scale-125"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
            Forecast details
        </h2>
        <div className="text-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Date:</span>
            <span className="text-lg font-medium">
              {new Date(item.dt_txt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Time:</span>
            <span className="text-lg font-medium">
              {new Date(item.dt_txt).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Weather:</span>
            <span className="text-lg font-medium capitalize">
              {item.weather[0].description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Temperature:</span>
            <span className="text-lg font-medium">
              {Math.round(item.main.temp)}°C
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Feels like:</span>
            <span className="text-lg font-medium">
              {Math.round(item.main.feels_like)}°C
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Humidity:</span>
            <span className="text-lg font-medium">{item.main.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Wind speed:</span>
            <span className="text-lg font-medium">{item.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
