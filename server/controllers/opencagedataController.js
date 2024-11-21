const axios = require('axios');
const { OPENCAGEDATA_API_KEY, OPENCAGEDATA_BASE_URL } = require('../config/apiConfig');

const getCountries = async (req, res) => {
  const { q: query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get(OPENCAGEDATA_BASE_URL, {
      params: {
        q: query,
        key: OPENCAGEDATA_API_KEY,
        limit: 10,
        countrycode: '', 
      },
    });

    const cityOptions = response.data.results.map((result) => ({
      label: result.formatted,
      value: result.geometry,
    }));

    res.json(cityOptions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching city data' });
  }
};

module.exports = { getCountries };
