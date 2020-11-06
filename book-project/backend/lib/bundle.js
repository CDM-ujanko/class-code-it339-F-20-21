'use strict';

const axios = require('axios'),
    sqlService = require('../services/SqlService');

module.exports = (app, es, passport) => {
  const url = `http://${es.host}:${es.port}/bundles/bundle/`

  // app.get('/api/bundle/:id', (req, resp) => {
  //   axios({
  //     url: `${url}${req.params.id}`,
  //     method: 'get',
  //   })
  //       .then(esResp => {
  //         // console.log(esResp)
  //         resp.json(esResp.data);
  //       })
  //       .catch(err => {
  //         resp.status(500).json(err);
  //       })
  // })

  app.put('/api/bundle/:id', passport.authenticate('jwt', {session: false}), (req, resp) => {
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

  // app.post('/api/bundle', (req, resp) => {
  //   // TODO: Validation!
  //   axios({
  //     url: `${url}`,
  //     method: 'POST',
  //     data: {
  //       name: req.body.name,
  //       description: req.body.description,
  //       books: []
  //     }
  //   })
  //       .then(esResp => {
  //         // console.log(esResp)
  //         resp.json(esResp.data);
  //       })
  //       .catch(err => {
  //         resp.status(500).json(err);
  //       })
  // })

  app.get('/api/bundles', passport.authenticate('jwt', {session: false}), (req, resp) => {
    sqlService.getBundles((err, results, filed) => {
      resp.json(results);
    })
  })

  app.get('/api/bundle/:id', passport.authenticate('jwt', {session: false}), (req, resp) => {
    sqlService.getBundle(req.params.id, (err, results, filed) => {
      resp.json(results);
    })
  })

  app.post('/api/bundle', passport.authenticate('jwt', {session: false}), (req, resp) => {
    sqlService.createBundle({
      name: req.body.name,
      description: req.body.description,
      books: ''
    }, (err, results, filed) => {
      resp.json(results);
    })
  })
}