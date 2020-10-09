'use strict';

const express = require('express'),
    pkg = require('./package.json'),
    axios = require('axios');

// let version = 'description';
// console.log(pkg[version], pkg.version, pkg);

const config = {
  port: 8080,
  es: {
    host: 'localhost',
    port: 9200
  }
}

const app = express(),
    search = require('./lib/search')(app, config.es),
    bundles = require('./lib/bundle')(app, config.es);

app.get('/api/version', (req, resp) => {
  resp.json({version: pkg.version});
})

app.get('/api/example/:smth', (req, resp) => {
  console.log(req);
  resp.json(req.params);
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