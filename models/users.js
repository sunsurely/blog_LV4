'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Posts, {
        sourceKey: 'usersId',
        foreignKey: 'UsersId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'usersId',
        foreignKey: 'UsersId',
      });
      this.hasMany(models.Likes, {
        sourceKey: 'usersId',
        foreignKey: 'UsersId',
      });
    }
  }
  Users.init(
    {
      usersId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
//
