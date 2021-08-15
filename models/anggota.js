'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Anggota.init({
    nama: DataTypes.STRING,
    nomor: DataTypes.STRING,
    telepon: DataTypes.STRING,
    pax: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    message: DataTypes.STRING,
    attend: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anggota',
  });
  return Anggota;
};