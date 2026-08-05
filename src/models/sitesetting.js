'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SiteSetting extends Model {
    static associate(models) {}
  }

  SiteSetting.init(
    {
      key: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      value: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'SiteSetting',
      tableName: 'site_settings',
      underscored: true,
      timestamps: true,
    }
  );

  return SiteSetting;
};