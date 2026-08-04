'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Culture extends Model {
    static associate(models) {}
  }

  Culture.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
      badge: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      content: { type: DataTypes.TEXT, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
      video_url: { type: DataTypes.STRING, allowNull: true, field: 'video_url' },
      featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: 'Culture',
      tableName: 'culture',
      underscored: true,
      timestamps: true,
    }
  );

  return Culture;
};