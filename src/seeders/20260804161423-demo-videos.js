'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('videos', [
      {
        id: 1,
        title: 'Liberia Marathon 2026 — Highlight Reel',
        category: 'Events',
        badge: 'Featured',
        description: 'A fast-paced highlight reel from race day.',
        content: 'This highlight video captures the top moments from the Liberia Marathon, from the starting gun to the finish line celebrations.',
        image: 'https://placehold.co/800x450?text=Video+1+Thumb',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        featured: true,
        date: new Date('2026-07-16'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Behind the Scenes: Fashion Shoot',
        category: 'Fashion',
        badge: null,
        description: 'A behind-the-scenes look at our latest fashion production.',
        content: 'Go behind the camera with our production crew as they set up and shoot a full fashion campaign with local designers.',
        image: 'https://placehold.co/800x450?text=Video+2+Thumb',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        featured: false,
        date: new Date('2026-07-30'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('videos', null, {});
  },
};