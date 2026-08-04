'use strict';
const { News } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(News, { resourceName: 'news' });