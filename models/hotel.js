'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      Hotel.hasMany(models.Room); // Un hôtel a plusieurs chambres
    }
  }
  Hotel.init({
    idHotel: {
      type: DataTypes.INTEGER,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: { // 'address' corrected from 'adress'
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};
