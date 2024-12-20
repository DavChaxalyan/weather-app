const express = require('express');
const { getCountries } = require('../controllers/opencagedataController');
const router = express.Router();

router.get('/countries', getCountries);

module.exports = router;
