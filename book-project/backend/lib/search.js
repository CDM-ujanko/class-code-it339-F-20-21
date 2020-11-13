'use strict';

const axios = require('axios');

module.exports = (app, es) => {
  app.get('/api/search/books', (req, resp) => {
    axios({
      url: `${es.host}:${es.port}/books/book/_search`,
      method: 'GET',
      headers: {
        'Authorization': `ApiKey ${es.key}`
      },
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
  });
}