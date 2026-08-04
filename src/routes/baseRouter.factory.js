'use strict';

const { Router } = require('express');

/**
 * Builds a standard REST router for a given resource controller.
 * Mirrors the controller factory — same five actions, same shape,
 * across every resource.
 *
 * @param {{ getAll, getOne, create, update, remove, toggleFeatured }} controller
 */
function createResourceRouter(controller) {
  const router = Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.patch('/:id/feature', controller.toggleFeatured);
  router.delete('/:id', controller.remove);

  return router;
}

module.exports = createResourceRouter;