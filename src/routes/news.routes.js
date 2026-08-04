'use strict';
const createResourceRouter = require('./baseRouter.factory');
const newsController = require('../controllers/news.controller');

module.exports = createResourceRouter(newsController);