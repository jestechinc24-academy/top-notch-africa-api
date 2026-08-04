'use strict';
const createResourceRouter = require('./baseRouter.factory');
const awardController = require('../controllers/award.controller');

module.exports = createResourceRouter(awardController);