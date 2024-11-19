import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ThemeSwitcher from './components/ThemeSwitcher';
import CitySearch from './components/CitySearch';

function App() {
  const [theme, setTheme] = useState('light');
  const [city, setCity] = useState(null);

  const handleCitySelect = (city) => {
    setCity(city);
  };
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} min-h-screen`}>
      <div className="container mx-auto py-10">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        <CitySearch onCitySelect={handleCitySelect} theme={theme}/>
        <WeatherCard city={city} theme={theme}/>
      </div>
    </div>
  );
}

export default App;
