'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('news', [
      {
        id: 1,
        title: 'Top Notch Africa Captures the Liberia Marathon',
        category: 'Events',
        badge: 'Featured',
        description: 'Our team was on the ground documenting one of Liberia\'s biggest annual sporting events.',
        content: 'From the starting line to the finish, Top Notch Africa provided full photo and video coverage of the Liberia Marathon, capturing the energy of runners and spectators alike.',
        image: 'https://placehold.co/800x450?text=Liberia+Marathon',
        video_url: null,
        featured: true,
        date: new Date('2026-07-15'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Behind the Lens: A Community Storytelling Project',
        category: 'Community',
        badge: null,
        description: 'A look at how we partner with local communities to document everyday stories across Liberia.',
        content: 'Top Notch Africa continues its mission of amplifying African stories through visual media, working directly with community members to capture authentic moments.',
        image: 'https://placehold.co/800x450?text=Community+Project',
        video_url: null,
        featured: false,
        date: new Date('2026-07-22'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('news', null, {});
  },
};