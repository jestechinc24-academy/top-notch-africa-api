'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('artists', [
      {
        id: 1,
        title: 'Featured Designer: Local Fashion Talent',
        category: 'Fashion',
        badge: 'Featured',
        description: 'Spotlight on an emerging designer from our recent fashion coverage.',
        content: 'We sat down with one of Monrovia\'s rising fashion designers to talk about their creative process and inspiration drawn from Liberian culture.',
        image: 'https://placehold.co/800x450?text=Artist+1',
        video_url: null,
        featured: true,
        date: new Date('2026-07-28'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Visual Storyteller Spotlight',
        category: 'Photography',
        badge: null,
        description: 'Introducing a photographer whose work captures everyday Liberian life.',
        content: 'This spotlight profiles a photographer whose community-focused work has become a key part of our storytelling projects.',
        image: 'https://placehold.co/800x450?text=Artist+2',
        video_url: null,
        featured: false,
        date: new Date('2026-07-12'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('artists', null, {});
  },
};