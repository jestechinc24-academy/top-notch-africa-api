'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {}
  }

  Video.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
      badge: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      content: { type: DataTypes.TEXT, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
      video_url: { type: DataTypes.STRING, allowNull: true, field: 'video_url' },
      duration: { type: DataTypes.STRING, allowNull: true },
      featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: 'Video',
      tableName: 'videos',
      underscored: true,
      timestamps: true,
    }
  );

  return Video;
};