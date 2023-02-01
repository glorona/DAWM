'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerNumber: {
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING
      },
      contactLastName: {
        type: Sequelize.STRING
      },
      contactFirstName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      addressLine1: {
        type: Sequelize.STRING
      },
      addressLine2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      salesRepEmployeeNumber: {
        type: Sequelize.INTEGER
      },
      creditLimit: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};