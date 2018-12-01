const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan("default"));


app.listen(3000, () => {
  console.log('Listening on Port 3000');
})