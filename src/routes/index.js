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
 * resources the /admin dashboard is expected to feature from), merges,
 * sorts by date, and returns the top N. This is a read-only computed
 * view — there is no dedicated "featured" table.
 */
router.get('/featured', async (req, res, next) => {
  try {
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 5));

    const [featuredNews, featuredVideos] = await Promise.all([
      db.News.findAll({ where: { featured: true }, order: [['date', 'DESC']] }),
      db.Video.findAll({ where: { featured: true }, order: [['date', 'DESC']] }),
    ]);

    const merged = [...featuredNews, ...featuredVideos]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    res.json({ success: true, data: merged });
  } catch (err) {
    next(err);
  }
});

module.exports = router;