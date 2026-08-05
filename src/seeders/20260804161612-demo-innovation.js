'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('innovation', [
      {
        title: 'New Digital Campaign Tools for Brand Partners',
        category: 'Digital Media',
        badge: 'Featured',
        description: 'How we\'re expanding our digital storytelling capabilities for brand clients.',
        content: 'Top Notch Africa has been investing in new digital campaign formats, blending short-form video and social storytelling to better serve brand partners.',
        image: 'https://placehold.co/800x450?text=Innovation+1',
        video_url: null,
        featured: true,
        date: new Date('2026-08-01'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Upgrading Our Production Workflow',
        category: 'Behind the Scenes',
        badge: null,
        description: 'A look at how our team is streamlining production for faster turnaround.',
        content: 'New editing tools and workflow changes have allowed our team to deliver event coverage and campaign content faster without sacrificing quality.',
        image: 'https://placehold.co/800x450?text=Innovation+2',
        video_url: null,
        featured: false,
        date: new Date('2026-07-24'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('innovation', null, {});
  },
};