'use strict';
const { Artist } = require('../models');
const createResourceController = require('./baseController.factory');

module.exports = createResourceController(Artist, { resourceName: 'artists' });