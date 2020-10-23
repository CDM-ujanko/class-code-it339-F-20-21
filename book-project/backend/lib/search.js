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

  app.get('/api/search/bundles/books', async (req, resp) => {
      try {
        let bundleResp = await axios.get(searchUrl('bundles', 'bundle'));

        let ids = [];
        let bundles = bundleResp.data.hits.hits;
        bundles.forEach((bundle) => {
          ids = ids.concat(bundle._source.books);
        })

        let booksResp = await axios({
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

        let books = booksResp.data.hits.hits;
        bundles.forEach((bundle) => {
          bundle.books = books.filter(book => bundle._source.books.includes(book._id))
        })

        resp.json(bundles);

      } catch (err) {
        resp.status(500).json(err);
      }
  });
}