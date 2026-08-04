'use strict';
const { Gallery } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Gallery, { resourceName: 'gallery' });