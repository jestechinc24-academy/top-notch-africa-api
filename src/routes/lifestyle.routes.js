'use strict';
const createResourceRouter = require('./baseRouter.factory');
const lifestyleController = require('../controllers/lifestyle.controller');

module.exports = createResourceRouter(lifestyleController);