"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Order.belongsTo(models.Pet, {
        foreignKey: "petId",
        as: "pet",
      });
    }
  }
  Order.init(
    {
      petId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      shipDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
