'use strict';

const axios = require('axios');

module.exports = (app, es) => {
  function searchUrl (index, type) {
    return `http://${es.host}:${es.port}/${index}/${type}/_search`
  }

  /**
   *
   * @param url
   * @param req
   * @param resp
   */
  function searchHandler (url, req, resp) {
    axios({
      url: url,
      method: 'GET',
      params: {
        from: req.query.from || 0,
        size: req.query.size || 100,
      }
    })
        .then(esResp => {
          // console.log(esResp)
          resp.json(esResp.data.hits.hits);
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