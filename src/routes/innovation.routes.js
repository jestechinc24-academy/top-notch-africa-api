'use strict';
const createResourceRouter = require('./baseRouter.factory');
const innovationController = require('../controllers/innovation.controller');

module.exports = createResourceRouter(innovationController);