export const searchCities = async (inputValue, setFilteredCities) => {
  try {
    if (!inputValue) {
      setFilteredCities([]);
      return;
    }

    const response = await fetch(`http://localhost:5000/countries?q=${inputValue}`);
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('Data is not an array');
    }
  } catch (error) {
    console.error('Error searching cities:', error);
    throw new Error('Error searching for cities');
  }
};