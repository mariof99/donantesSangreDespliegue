'use strict';
const { Model } = require('sequelize');
const Cita = require('./Cita');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.RolUser, {as: 'RolUser', foreignKey: 'idUser'});
      User.hasMany(models.Chat, {as: 'Chat', foreignKey: 'idUser', targetKey: 'id'});
      User.hasMany(models.Cita, {as: 'citas', foreignKey: 'userId'});
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    gSanguineo: DataTypes.STRING(3),
    passwd: DataTypes.STRING,
    codRecPasswd: DataTypes.STRING,
    dni: DataTypes.STRING,
    nDonante: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};