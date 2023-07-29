"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      petId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pets", // Assuming your Pet model is named 'Pets'
          key: "id", // Assuming the primary key of the Pet model is 'id'
        },
        onUpdate: "CASCADE", // Optional: Update the petId in Orders when the referenced Pet's id changes
        onDelete: "SET NULL", // Optional: Set petId to NULL when the referenced Pet is deleted
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      shipDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
