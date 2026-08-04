'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_items', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        // No autoIncrement — the app supplies its own id (Date.now()-style),
        // matching the existing crud.controller.js pattern.
      },
      resource: {
        type: Sequelize.STRING,
        allowNull: false,
        // 'news' | 'videos' | 'gallery' | 'artists' | 'awards' | 'culture' | 'innovation' | 'lifestyle'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      badge: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      video_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Index matching the most common query pattern: filter by resource, sort by date
    await queryInterface.addIndex('content_items', ['resource', 'date'], {
      name: 'idx_content_items_resource_date',
    });

    // Index for category filtering within a resource
    await queryInterface.addIndex('content_items', ['resource', 'category'], {
      name: 'idx_content_items_category',
    });

    // Full-text search: raw SQL, since Sequelize's migration API doesn't
    // support generated tsvector columns directly.
    await queryInterface.sequelize.query(`
      ALTER TABLE content_items
      ADD COLUMN search_vector tsvector
      GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'C')
      ) STORED;
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX idx_content_items_search_vector
      ON content_items USING gin (search_vector);
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_items');
  },
};