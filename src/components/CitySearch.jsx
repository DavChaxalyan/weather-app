import React, { useState, useCallback } from 'react';
import { searchCities } from '../services/cityService';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import Loader from './Loader';

const CitySearch = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCitiesCallback = useCallback(async (inputValue) => {
    if (!inputValue) {
      setFilteredCities([]);
      return;
    }

    setIsLoading(true);

    try {
      const cityOptions = await searchCities(inputValue, setFilteredCities);
      setFilteredCities(cityOptions);
    } catch (error) {
      console.error('Error searching cities:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearchCities = useCallback(debounce(searchCitiesCallback, 500), []);

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    debouncedSearchCities(inputValue);
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      onCitySelect(selectedOption.label); 
    }
  };

  return (
    <div className="max-w-[400px] w-full flex justify-center items-center p-4">
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <Select
          inputValue={inputValue} 
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
      {isLoading && <Loader />}
    </div>
  );
};

export default CitySearch;
