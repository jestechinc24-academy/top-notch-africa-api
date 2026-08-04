'use strict';
const createResourceRouter = require('./baseRouter.factory');
const cultureController = require('../controllers/culture.controller');

module.exports = createResourceRouter(cultureController);