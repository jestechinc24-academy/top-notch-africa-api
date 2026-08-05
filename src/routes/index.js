'use strict';

const { Router } = require('express');
const db = require('../models');

const newsRoutes = require('./news.routes');
const videoRoutes = require('./video.routes');
const galleryRoutes = require('./gallery.routes');
const artistRoutes = require('./artist.routes');
const awardRoutes = require('./award.routes');
const cultureRoutes = require('./culture.routes');
const innovationRoutes = require('./innovation.routes');
const lifestyleRoutes = require('./lifestyle.routes');

const router = Router();

router.use('/news', newsRoutes);
router.use('/videos', videoRoutes);
router.use('/gallery', galleryRoutes);
router.use('/artists', artistRoutes);
router.use('/awards', awardRoutes);
router.use('/culture', cultureRoutes);
router.use('/innovation', innovationRoutes);
router.use('/lifestyle', lifestyleRoutes);

/**
 * GET /api/featured
 * Pulls rows flagged `featured: true` from news and videos (the two
 * resources the /admin dashboard is expected to feature from), tags
 * each with its source resource (so the admin panel knows which
 * endpoint to PATCH/PUT), merges, sorts by admin-controlled
 * featured_order (falls back to date), and returns the top N.
 * This is a read-only computed view — there is no dedicated
 * "featured" table.
 */
router.get('/featured', async (req, res, next) => {
  try {
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 5));

    const [featuredNews, featuredVideos] = await Promise.all([
      db.News.findAll({ where: { featured: true }, order: [['date', 'DESC']] }),
      db.Video.findAll({ where: { featured: true }, order: [['date', 'DESC']] }),
    ]);

    const taggedNews = featuredNews.map((n) => ({ ...n.toJSON(), __resource: 'news' }));
    const taggedVideos = featuredVideos.map((v) => ({ ...v.toJSON(), __resource: 'videos' }));

    const merged = [...taggedNews, ...taggedVideos]
      .sort((a, b) => {
        // Lower featuredOrder shows first; ties fall back to newest date
        const orderA = a.featuredOrder ?? 0;
        const orderB = b.featuredOrder ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, limit);

    res.json({ success: true, data: merged });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/settings/:key
 * Reads a single site setting (e.g. hero_rotation_seconds).
 */
router.get('/settings/:key', async (req, res, next) => {
  try {
    const setting = await db.SiteSetting.findByPk(req.params.key);
    if (!setting) {
      return res.status(404).json({ success: false, error: `Setting "${req.params.key}" not found` });
    }
    res.json({ success: true, data: setting });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/settings/:key
 * Upserts a site setting — used by the admin panel's timing control.
 */
router.put('/settings/:key', async (req, res, next) => {
  try {
    if (req.body.value === undefined || req.body.value === null || String(req.body.value).trim() === '') {
      return res.status(400).json({ success: false, error: 'value is required' });
    }
    await db.SiteSetting.upsert({ key: req.params.key, value: String(req.body.value) });
    const setting = await db.SiteSetting.findByPk(req.params.key);
    res.json({ success: true, data: setting });
  } catch (err) {
    next(err);
  }
});

module.exports = router;