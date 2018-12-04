const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');
const control = require('../database/controllers.js');


const app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan("default"));

app.get('/bikeshares/city/:longitude/:latitude', (req, res) => {
  const long = parseFloat(req.params.longitude.slice(1));
  const lat = parseFloat(req.params.latitude.slice(1));
  axios.get(`https://api.coord.co/v1/sv/location?latitude=${lat}&longitude=${long}&radius_km=2.0&access_key=${config.ACCESS_KEY}`)
  .then(resp => {
    const data = resp.data.features;
    res.send(data);
  })
  .catch(err => console.log(err));
})

app.get('/bikeshares/city/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  control.findReviews(name, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  })
})

app.post('/bikeshares/city/', (req, res) => {
  console.log(req.body);
  control.saveReviews(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on Port 3000');
})