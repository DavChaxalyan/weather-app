export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(`http://localhost:5000/weather?q=${city}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Ошибка при получении данных о погоде');
  }
};

export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(`http://localhost:5000/forecast?q=${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    throw new Error('Ошибка при получении прогноза погоды');
  }
};