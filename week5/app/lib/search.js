'use strict';

const axios = require('axios');

module.exports = (app, es) => {
  console.log(es);
  const url = `http://${es.host}:${es.port}/books/book/_search`

  function searchUrl (index, type) {
    return `http://${es.host}:${es.port}/${index}/${type}/_search`
  }

  function searchHandler (url, req, resp) {
    let size = req.query.size || 100;
    // axios.get(`${url}?size=${size}`)

    axios({
      url: url,
      method: 'GET',
      params: {
        size: size
      }
    })
        .then(esResp => {
          // console.log(esResp)
          resp.json(esResp.data);
        })
        .catch(err => {
          resp.status(500).json(err);
        })
  }

  app.get('/api/search/books', (req, resp) =>
      searchHandler(searchUrl('books', 'book'), req, resp));
  app.get('/api/search/bundles', (req, resp) =>
      searchHandler(searchUrl('bundles', 'bundle'), req, resp));
}