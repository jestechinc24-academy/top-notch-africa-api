'use strict';
const createResourceRouter = require('./baseRouter.factory');
const galleryController = require('../controllers/gallery.controller');

module.exports = createResourceRouter(galleryController);