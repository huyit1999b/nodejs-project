const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get('/', (req, res) => {
  const strTest = 'Hello World';
  return res.status(200).json({
    message: 'Welcome to the API',
    metadata: strTest.repeat(200000),
  });
});

module.exports = app;
