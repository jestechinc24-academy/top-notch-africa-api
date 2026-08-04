'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gallery', {
      id: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      category: { type: Sequelize.STRING, allowNull: true },
      badge: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      content: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING, allowNull: true },
      image_count: { type: Sequelize.STRING, allowNull: true },
      featured: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    await queryInterface.addIndex('gallery', ['date'], { name: 'idx_gallery_date' });
    await queryInterface.addIndex('gallery', ['category'], { name: 'idx_gallery_category' });

    await queryInterface.sequelize.query(`
      ALTER TABLE gallery
      ADD COLUMN search_vector tsvector
      GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'C')
      ) STORED;
    `);
    await queryInterface.sequelize.query(`
      CREATE INDEX idx_gallery_search_vector ON gallery USING gin (search_vector);
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('gallery');
  },
};