const express = require('express');
const { getWeather, getWeatherForecast } = require('../controllers/weatherController');
const router = express.Router();

router.get('/weather', getWeather);
router.get('/forecast', getWeatherForecast);

module.exports = router;
