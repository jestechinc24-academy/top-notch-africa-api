'use strict';
const { Video } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Video, { resourceName: 'videos' });