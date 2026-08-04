'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate(models) {}
  }

  Gallery.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
      badge: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      content: { type: DataTypes.TEXT, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
      image_count: { type: DataTypes.STRING, allowNull: true, field: 'image_count' },
      featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: 'Gallery',
      tableName: 'gallery',
      underscored: true,
      timestamps: true,
    }
  );

  return Gallery;
};