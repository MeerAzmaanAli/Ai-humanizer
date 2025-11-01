const express = require('express');
const { humanize, score } = require('../controllers/controller');

const routes = express.Router();

// Humanize text
routes.post('/humanize', humanize);
routes.post('/score', score);

module.exports = routes;