'use strict';
const { Award } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Award, { resourceName: 'awards' });