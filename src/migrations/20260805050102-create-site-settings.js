'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('site_settings', {
      key: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
      value: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    await queryInterface.bulkInsert('site_settings', [
      { key: 'hero_rotation_seconds', value: '8', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('site_settings');
  },
};