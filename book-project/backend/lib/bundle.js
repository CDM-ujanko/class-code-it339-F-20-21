'use strict';

const axios = require('axios'),
    sqlService = require('../services/SqlService');

module.exports = (app, es, passport) => {
  app.put('/api/bundle/:id', passport.authenticate('jwt', {session: false}), (req, resp) => {
    // TODO: Validation!
  })

  app.get('/api/bundles', passport.authenticate('jwt', {session: false}), (req, resp) => {
    sqlService.getBundles(req.user.email, async (err, bundles, filed) => {
      try {
        let ids = [];
        bundles.forEach((bundle) => {
          bundle.books = bundle.books.split(',')
          ids = ids.concat(bundle.books);
        })

        let booksResp = await axios({
          url: `${es.host}:${es.port}/books/book/_search`,
          headers: {
            'Authorization': `ApiKey ${es.key}`
          },
          method: 'GET',
          data: {
            query: {
              ids: {
                values: ids
              }
            }
          }
        })

        let books = booksResp.data.hits.hits;
        bundles.forEach((bundle) => {
          bundle.books = books.filter(book => bundle.books.includes(book._id))
        })

        resp.json(bundles);
      } catch (err) {
        resp.status(500).json(err);
      }
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