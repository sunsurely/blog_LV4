'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'usersId',
        foreignKey: 'UsersId',
      });

      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'PostId',
      });
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PostId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      UsersId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      Nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Comments',
    },
  );
  return Comments;
};
