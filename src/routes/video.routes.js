'use strict';
const createResourceRouter = require('./baseRouter.factory');
const videoController = require('../controllers/video.controller');

module.exports = createResourceRouter(videoController);