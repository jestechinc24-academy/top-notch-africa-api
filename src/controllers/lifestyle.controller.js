'use strict';
const { Lifestyle } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Lifestyle, { resourceName: 'lifestyle' });