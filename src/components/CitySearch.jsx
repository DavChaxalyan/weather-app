import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

const CitySearch = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = 'bb206b84a9b841b8bf27035afd364fc3'; 

  const searchCities = useCallback(async (inputValue) => {
    if (!inputValue) {
      setFilteredCities([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: inputValue,
          key: API_KEY,
          limit: 10, 
          countrycode: '', 
        },
      });

      const cityOptions = response.data.results.map((result) => ({
        label: `${result.formatted}`,
        value: result.geometry, 
      }));

      setFilteredCities(cityOptions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearchCities = useCallback(debounce(searchCities, 500), []);

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    debouncedSearchCities(inputValue);
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption);
      
      onCitySelect(selectedOption.label); 
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
          placeholder="Enter city"
          isClearable
          isLoading={isLoading}
          isSearchable
          className="border-2 border-gray-300 rounded-lg w-full p-3 pl-12 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-black"
          classNamePrefix="react-select"
        />
      </div>
      {isLoading && <div className="text-gray-500 mt-2 animate-pulse">Loading...</div>}
    </div>
  );
};

export default CitySearch;
