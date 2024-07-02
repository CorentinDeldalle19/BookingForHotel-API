'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User); // Une réservation appartient à un utilisateur
      Booking.belongsTo(models.Room); // Une réservation appartient à une chambre
    }
  }
  Booking.init({
    idBooking: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};