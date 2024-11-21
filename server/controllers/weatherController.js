const axios = require('axios');
const { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } = require('../config/apiConfig');

const getWeather = async (req, res) => {
  const city = req.query.q;

    try {
        const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
            params: {
                q: city || 'Yerevan',
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });
        

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};

const getWeatherForecast = async (req, res) => {
  const city = req.query.q;

  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: city || 'Yerevan',
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    const grouped = response.data.list.reduce((acc, item) => {
      const date = new Date(item.dt_txt).toLocaleDateString('ru-RU');
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    res.json(grouped);  
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather forecast data' });
  }
};

module.exports = { getWeather, getWeatherForecast };
