const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;

const restaurantsRoute = require('./routes/Restaurants');

// move all routes for restaurant into separate routes file
app.use('/api/v1/restaurants', restaurantsRoute);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
