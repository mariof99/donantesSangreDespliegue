'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolUser.init({
    idRol: DataTypes.BIGINT,
    idUser: DataTypes.BIGINT
  }, {
    sequelize,
    timestamps: false,
    tableName: 'rolUser',
    modelName: 'RolUser',
  });

  RolUser.removeAttribute('id');

  return RolUser;
}; 