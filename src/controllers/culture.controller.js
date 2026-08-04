'use strict';
const { Culture } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Culture, { resourceName: 'culture' });