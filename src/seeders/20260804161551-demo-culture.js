'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('culture', [
      {
        id: 1,
        title: 'Preserving Liberian Storytelling Traditions',
        category: 'Culture',
        badge: 'Featured',
        description: 'How local storytelling traditions inform our documentary-style coverage.',
        content: 'This piece explores how Top Notch Africa draws on Liberian oral storytelling traditions to shape the narrative style of its community documentary projects.',
        image: 'https://placehold.co/800x450?text=Culture+1',
        video_url: null,
        featured: true,
        date: new Date('2026-07-05'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Cultural Moments Through the Lens',
        category: 'Culture',
        badge: null,
        description: 'A look back at key cultural events documented this year.',
        content: 'From community festivals to public celebrations, this feature rounds up some of the most meaningful cultural moments captured by our team.',
        image: 'https://placehold.co/800x450?text=Culture+2',
        video_url: null,
        featured: false,
        date: new Date('2026-07-20'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('culture', null, {});
  },
};