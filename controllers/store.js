const { Order, Pet } = require("../models"); // Assuming you have Order and Pet models defined

class StoreController {
  // POST /order
  async placeOrder(req, res) {
    const schema = Joi.object({
      petId: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required(),
    });

    try {
      const { petId, quantity } = await schema.validateAsync(req.body);

      // Check if the pet exists and is available for purchase
      const pet = await Pet.findByPk(petId);

      if (!pet || pet.status !== "available") {
        return res
          .status(404)
          .json({ error: "Pet not available for purchase" });
      }

      // Calculate the total cost and create the order
      const totalCost = pet.price * quantity;
      const newOrder = await Order.create({ petId, quantity, totalCost });

      return res.status(201).json(newOrder);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Failed to place an order: ${error.message}` });
    }
  }

  // GET /order/{orderId}
  async findOrderById(req, res) {
    try {
      const orderId = parseInt(req.params.orderId);

      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Failed to find an order" });
    }
  }

  // DELETE /order/{orderId}
  async deleteOrderById(req, res) {
    try {
      const orderId = parseInt(req.params.orderId);

      const deletedRowCount = await Order.destroy({ where: { id: orderId } });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete an order" });
    }
  }

  // GET /inventory
  async getInventory(req, res) {
    try {
      // Get pet inventories by status
      const inventories = await Pet.findAll({
        attributes: [
          "status",
          [sequelize.fn("count", sequelize.col("id")), "count"],
        ],
        group: "status",
      });

      const inventoryByStatus = {};
      inventories.forEach((item) => {
        inventoryByStatus[item.status] = item.dataValues.count;
      });

      return res.json(inventoryByStatus);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get pet inventories" });
    }
  }
}

module.exports = new StoreController();
