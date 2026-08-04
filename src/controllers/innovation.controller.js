'use strict';
const { Innovation } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Innovation, { resourceName: 'innovation' });