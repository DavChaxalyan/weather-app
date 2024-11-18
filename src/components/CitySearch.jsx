import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

const CitySearch = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '8de2a66998ece5d1efc05efef9111f41';

  // Функция для поиска городов
  const searchCities = useCallback(async (inputValue) => {
    if (!inputValue) {
      setFilteredCities([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/find', {
        params: {
          q: inputValue,
          type: 'like',
          sort: 'population',
          cnt: 50,
          appid: API_KEY,
        },
      });

      const cityOptions = response.data.list.map((city) => ({
        label: `${city.name}, ${city.sys.country}`,
        value: city.name,
      }));

      // Фильтруем города, где введенная строка присутствует в названии
      const filtered = cityOptions.filter((city) =>
        city.label.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredCities(filtered);
    } catch (error) {
      console.error('Error fetching cities:', error);
      if (error.response) {
        // Если ошибка от API, показываем подробности
        console.error('API error:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Добавляем debounce для минимизации запросов
  const debouncedSearchCities = useCallback(debounce(searchCities, 500), []);

  // Обработчик изменения в поле ввода
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    debouncedSearchCities(inputValue); // Выполняем запрос с задержкой
  };

  // Обработчик выбора города
  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      onCitySelect(selectedOption.value); // Отправляем выбранный город
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <Select
          value={inputValue}
          onInputChange={handleInputChange}
          options={filteredCities}
          onChange={handleCitySelect}
          placeholder="Введите город"
          isClearable
          isLoading={isLoading}
          isSearchable
          className="border-2 border-gray-300 rounded-lg w-full p-3 pl-12 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          classNamePrefix="react-select"
        />
      </div>
      {isLoading && <div className="text-gray-500 mt-2 animate-pulse">Загрузка...</div>}
    </div>
  );
};

export default CitySearch;
