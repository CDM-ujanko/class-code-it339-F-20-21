'use strict';

const sqlService = require('../services/SqlService'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

require('dotenv').config()

module.exports = app => {
  app.post('/api/user', (req, resp) => {
    sqlService.createUser(req.body, (err, results) => {
      if (err) {
        return resp.status(500).json(err);
      }

      resp.json(results);
    })
  })

  app.get('/api/users', (req, resp) => {
    sqlService.getUsers((err, results) => {
      if (err) {
        return resp.status(500).json(err);
      }

      resp.json(results);
    });
  });

  app.post('/api/login', (req, resp) => {
    sqlService.getUser(req.body.email, (err, results) => {
      if (err) {
        return resp.status(500).json(err);
      }

      if (!results.length) {
        return resp.status(401).json('User not found.');
      }

      if (!bcrypt.compareSync(req.body.password, results[0].password)) {
        return resp.status(401).json('Invalid password.');
      }

      let body = {
        _id: results[0].id,
        firstName: results[0].firstName,
        lastName: results[0].lastName,
        email: results[0].email,
      };

      let token = jwt.sign(body, process.env.JWT_SECRET);

      return resp.json({ token, user: body });
    });
  });
}