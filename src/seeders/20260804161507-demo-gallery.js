'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('gallery', [
      {
        title: 'Liberia Marathon — Race Day Gallery',
        category: 'Events',
        badge: 'Featured',
        description: 'A curated photo set from race day.',
        content: 'A collection of our favorite shots from the Liberia Marathon, showing runners, crowds, and the finish-line atmosphere.',
        image: 'https://placehold.co/800x450?text=Gallery+1',
        image_count: 24,
        featured: true,
        date: new Date('2026-07-16'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Fashion Campaign — Full Set',
        category: 'Fashion',
        badge: null,
        description: 'The complete photo set from our latest fashion shoot.',
        content: 'Every frame from our latest collaboration with local Liberian designers, shot on location in Monrovia.',
        image: 'https://placehold.co/800x450?text=Gallery+2',
        image_count: 18,
        featured: false,
        date: new Date('2026-07-29'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('gallery', null, {});
  },
};