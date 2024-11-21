const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const opencageRoutes = require('./routes/opencageRoutes');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(weatherRoutes);
app.use(opencageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
