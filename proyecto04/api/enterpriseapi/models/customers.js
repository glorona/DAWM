'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    customerNumber: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    contactLastName: DataTypes.STRING,
    contactFirstName: DataTypes.STRING,
    phone: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    salesRepEmployeeNumber: DataTypes.INTEGER,
    creditLimit: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};