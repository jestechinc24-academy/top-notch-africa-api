'use strict';

const { Op } = require('sequelize');

/**
 * Builds a standard CRUD controller for a given Sequelize model.
 * Every resource controller (news, videos, gallery, ...) is a thin
 * wrapper around this factory — logic lives here exactly once.
 *
 * Response envelope is consistent across all resources:
 *   { success, data, meta? }  on success
 *   { success: false, error } on failure
 *
 * @param {import('sequelize').ModelStatic} Model
 * @param {{ resourceName: string, searchable?: boolean }} options
 */
function createResourceController(Model, { resourceName, searchable = true }) {
  const getAll = async (req, res, next) => {
    try {
      const { category, featured, q, page = 1, limit = 50 } = req.query;

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
      const offset = (pageNum - 1) * limitNum;

      const where = {};
      if (category) where.category = { [Op.iLike]: category };
      if (featured !== undefined) where.featured = featured === 'true';

      let rows, count;

      if (q && String(q).trim() !== '' && searchable) {
        // Full-text search against the generated search_vector column.
        // Raw query is required here — Sequelize has no built-in
        // tsvector query builder.
        const tableName = Model.getTableName();
        const searchTerm = String(q).trim();

        const [results] = await Model.sequelize.query(
          `
          SELECT *, count(*) OVER() AS full_count
          FROM "${tableName}"
          WHERE search_vector @@ websearch_to_tsquery('english', :q)
          ${category ? 'AND category ILIKE :category' : ''}
          ${featured !== undefined ? 'AND featured = :featured' : ''}
          ORDER BY date DESC
          LIMIT :limit OFFSET :offset
          `,
          {
            replacements: {
              q: searchTerm,
              category: category || null,
              featured: featured === 'true',
              limit: limitNum,
              offset,
            },
          }
        );

        rows = results.map(({ full_count, ...rest }) => rest);
        count = results.length > 0 ? Number(results[0].full_count) : 0;
      } else {
        const result = await Model.findAndCountAll({
          where,
          order: [['date', 'DESC']],
          limit: limitNum,
          offset,
        });
        rows = result.rows;
        count = result.count;
      }

      res.json({
        success: true,
        data: rows,
        meta: {
          total: count,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(count / limitNum),
          resource: resourceName,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const row = await Model.findByPk(req.params.id);

      if (!row) {
        return res.status(404).json({
          success: false,
          error: `Item with id "${req.params.id}" not found in ${resourceName}`,
        });
      }

      res.json({ success: true, data: row });
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, res, next) => {
    try {
      if (!req.body.title || String(req.body.title).trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'title is required',
        });
      }

      const payload = {
        id: Date.now(),
        title: req.body.title,
        category: req.body.category ?? null,
        badge: req.body.badge ?? null,
        description: req.body.description ?? null,
        content: req.body.content ?? null,
        image: req.body.image ?? null,
        video_url: req.body.videoUrl ?? null,
        featured: req.body.featured ?? false,
        date: req.body.date ?? new Date(),
      };

      // Resource-specific extra fields (duration on videos, image_count on gallery)
      // are attached only if the model actually defines that column.
      if (Model.rawAttributes.duration && req.body.duration !== undefined) {
        payload.duration = req.body.duration;
      }
      if (Model.rawAttributes.image_count && req.body.imageCount !== undefined) {
        payload.image_count = req.body.imageCount;
      }

      const row = await Model.create(payload);
      res.status(201).json({ success: true, data: row });
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    try {
      const row = await Model.findByPk(req.params.id);

      if (!row) {
        return res.status(404).json({
          success: false,
          error: `Item with id "${req.params.id}" not found in ${resourceName}`,
        });
      }

      const updates = {};
      if (req.body.title !== undefined) updates.title = req.body.title;
      if (req.body.category !== undefined) updates.category = req.body.category;
      if (req.body.badge !== undefined) updates.badge = req.body.badge;
      if (req.body.description !== undefined) updates.description = req.body.description;
      if (req.body.content !== undefined) updates.content = req.body.content;
      if (req.body.image !== undefined) updates.image = req.body.image;
      if (req.body.videoUrl !== undefined) updates.video_url = req.body.videoUrl;
      if (req.body.featured !== undefined) updates.featured = req.body.featured;
      if (req.body.date !== undefined) updates.date = req.body.date;

      if (Model.rawAttributes.duration && req.body.duration !== undefined) {
        updates.duration = req.body.duration;
      }
      if (Model.rawAttributes.image_count && req.body.imageCount !== undefined) {
        updates.image_count = req.body.imageCount;
      }

      await row.update(updates);
      res.json({ success: true, data: row });
    } catch (err) {
      next(err);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const row = await Model.findByPk(req.params.id);

      if (!row) {
        return res.status(404).json({
          success: false,
          error: `Item with id "${req.params.id}" not found in ${resourceName}`,
        });
      }

      await row.destroy();
      res.json({ success: true, data: { id: req.params.id, deleted: true } });
    } catch (err) {
      next(err);
    }
  };

  /**
   * PATCH /api/:resource/:id/feature
   * Dedicated endpoint for the /admin "feature this" toggle — avoids
   * overloading the generic update() with a special-case field.
   */
  const toggleFeatured = async (req, res, next) => {
    try {
      const row = await Model.findByPk(req.params.id);

      if (!row) {
        return res.status(404).json({
          success: false,
          error: `Item with id "${req.params.id}" not found in ${resourceName}`,
        });
      }

      const nextValue =
        req.body.featured !== undefined ? Boolean(req.body.featured) : !row.featured;

      await row.update({ featured: nextValue });
      res.json({ success: true, data: row });
    } catch (err) {
      next(err);
    }
  };

  return { getAll, getOne, create, update, remove, toggleFeatured };
}

module.exports = createResourceController;