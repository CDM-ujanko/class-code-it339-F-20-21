'use strict';

const axios = require('axios');

module.exports = (app, es) => {
  console.log(es);
  const url = `http://${es.host}:${es.port}/bundles/bundle/`

  app.get('/api/bundles/create', (req, resp) => {
    axios({
      url: url,
      method: 'POST',
      data: {
        name: req.query.name,
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

  app.get('/api/bundle/:id', (req, resp) => {
    let books = req.query.ids.split(',') || [],
        name = req.query.name || '';

    axios({
      url: `${url}${req.params.id}`,
      method: 'PUT',
      data: {
        name: name,
        books: books
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

  app.get('/api/bundle/:id/books', async (req, resp) => {
    try {
      let bundleResponse = await axios.get(`${url}${req.params.id}`);
      let ids = bundleResponse.data._source.books;
      let booksResponse = await axios({
        url: `http://${es.host}:${es.port}/books/book/_search`,
        method: 'GET',
        data: {
          query: {
            ids: {
              values: ids
            }
          }
        }
      })
      resp.json(booksResponse.data.hits.hits);

    } catch (err) {
      resp.status(500).json(err);
    }
  })
}