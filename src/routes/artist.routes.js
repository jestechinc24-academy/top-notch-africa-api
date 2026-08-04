'use strict';
const createResourceRouter = require('./baseRouter.factory');
const artistController = require('../controllers/artist.controller');

module.exports = createResourceRouter(artistController);