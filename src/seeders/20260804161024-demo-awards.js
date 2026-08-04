'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('awards', [
      {
        id: 1,
        title: 'Best Media Coverage — Liberia Marathon 2026',
        category: 'Sports Media',
        badge: 'Winner',
        description: 'Recognized for outstanding photo and video coverage of a major national sporting event.',
        content: 'Top Notch Africa was honored for its comprehensive media coverage of the Liberia Marathon, praised for capturing both the competitive spirit and community energy of the event.',
        image: 'https://placehold.co/800x450?text=Award+1',
        video_url: null,
        featured: true,
        date: new Date('2026-06-10'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Rising Creative Agency of the Year',
        category: 'Industry Recognition',
        badge: null,
        description: 'Acknowledged among Liberia\'s fastest-growing creative media agencies.',
        content: 'The agency was recognized by regional media peers for its rapid growth and consistent output across events, fashion, and digital campaign work.',
        image: 'https://placehold.co/800x450?text=Award+2',
        video_url: null,
        featured: false,
        date: new Date('2026-05-18'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('awards', null, {});
  },
};