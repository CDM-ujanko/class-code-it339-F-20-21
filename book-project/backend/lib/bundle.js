'use strict';

const axios = require('axios');

module.exports = (app, es) => {
  const url = `http://${es.host}:${es.port}/bundles/bundle/`

  app.get('/api/bundle/:id', (req, resp) => {
    axios({
      url: `${url}${req.params.id}`,
      method: 'get',
    })
        .then(esResp => {
          // console.log(esResp)
          resp.json(esResp.data);
        })
        .catch(err => {
          resp.status(500).json(err);
        })
  })

  app.put('/api/bundle/:id', (req, resp) => {
    // TODO: Validation!
    axios({
      url: `${url}${req.params.id}`,
      method: 'PUT',
      data: {
        name: req.body.name,
        description: req.body.description,
        books: req.body.books
      }
    })
        .then(esResp => {
          // console.log(esResp)
          resp.json(esResp.data);
        })
        .catch(err => {
          resp.status(500).json(err);
        })
  })

  app.post('/api/bundle', (req, resp) => {
    // TODO: Validation!
    axios({
      url: `${url}`,
      method: 'POST',
      data: {
        name: req.body.name,
        description: req.body.description,
        books: []
      }
    })
        .then(esResp => {
          // console.log(esResp)
          resp.json(esResp.data);
        })
        .catch(err => {
          resp.status(500).json(err);
        })
  })
}