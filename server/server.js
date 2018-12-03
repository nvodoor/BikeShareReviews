const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const config = require('../config.js');

const app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan("default"));

app.get('/bikeshares/city/:longitude/:latitude', (req, res) => {
  const long = parseFloat(req.params.longitude.slice(1));
  const lat = parseFloat(req.params.latitude.slice(1));
  axios.get(`https://api.coord.co/v1/sv/location?latitude=${lat}&longitude=${long}&radius_km=1&access_key=${config.ACCESS_KEY}`)
  .then(resp => {
    const data = resp.data.features;
    console.log(data.length);
    res.send(data);
  })
  .catch(err => console.log(err));
})


app.listen(3000, () => {
  console.log('Listening on Port 3000');
})