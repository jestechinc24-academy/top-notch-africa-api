'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lifestyle', [
      {
        id: 1,
        title: 'A Day in Monrovia: Street Style Spotlight',
        category: 'Lifestyle',
        badge: 'Featured',
        description: 'Exploring everyday style and self-expression on the streets of Monrovia.',
        content: 'Our lifestyle team spent a day capturing candid street style moments across Monrovia, showcasing how everyday Liberians express personal style and culture.',
        image: 'https://placehold.co/800x450?text=Lifestyle+1',
        video_url: null,
        featured: true,
        date: new Date('2026-07-10'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Weekend Markets: Color, Food, and Community',
        category: 'Culture',
        badge: null,
        description: 'A visual journey through one of Monrovia\'s most vibrant weekend markets.',
        content: 'From fresh produce to handmade crafts, our crew documented the sights and sounds of a bustling local market, capturing the community spirit that defines it.',
        image: 'https://placehold.co/800x450?text=Lifestyle+2',
        video_url: null,
        featured: false,
        date: new Date('2026-07-18'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lifestyle', null, {});
  },
};