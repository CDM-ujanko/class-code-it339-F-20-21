'use strict';

const express = require('express'),
    pkg = require('./package.json'),
    axios = require('axios'),
    sqlService = require('./services/SqlService');

require('dotenv').config()

const config = {
  port: process.env.SERVER_PORT,
  es: {
    host: process.env.ES_HOST,
    port: process.env.ES_PORT
  }
}

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());

require('./lib/search')(app, config.es);
require('./lib/bundle')(app, config.es);

app.get('/api/version', (req, resp) => {
  resp.json({version: pkg.version});
})

app.get('/api/book/:id', (req, resp) => {
  axios.get(`http://localhost:9200/books/book/${req.params.id}`)
      .then(esResp => {
        resp.json(esResp.data);
      })
      .catch(err => {
        resp.status(500).json(err);
      })
})

app.listen(config.port, () => console.log(`Server started on ${config.port}`));