const { Router } = require("express");
const router = Router();
const StoreController = require("../controllers/store");

// POST /store/order
router.post("/order", StoreController.placeOrder);

// GET /store/order/{orderId}
router.get("/order/:orderId", StoreController.findOrderByOrderId);

// DELETE /store/order/{orderId}
router.delete("/order/:orderId", StoreController.deleteOrderByOrderId);

// GET /store/inventory
router.get("/inventory", StoreController.getPetInventoriesByStatus);

module.exports = router;
