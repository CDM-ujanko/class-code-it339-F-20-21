'use strict';

const express = require('express'),
    pkg = require('./package.json'),
    axios = require('axios'),
    SqlService = require('./services/SqlService'),
    passport = require('passport');

require('dotenv').config()

const config = {
  port: process.env.SERVER_PORT,
  es: {
    host: process.env.ES_HOST,
    port: process.env.ES_PORT,
    key: process.env.ES_API_KEY
  }
}

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://classexample.com');

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

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use( new JwtStrategy(opts, (jwtPayload, done) => {
  console.log(jwtPayload);
  SqlService.getUser(jwtPayload.email, (err, results) => {
    if (err) {
      return done(err, false);
    }

    if (results.length) {

      let user = {
        _id: results[0].id,
        firstName: results[0].firstName,
        lastName: results[0].lastName,
        email: results[0].email,
      };

      return done(null, user);
    } else {
      return done(null, false);
    }
  })
}));

require('./lib/search')(app, config.es);
require('./lib/bundle')(app, config.es, passport);
require('./lib/user')(app);

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