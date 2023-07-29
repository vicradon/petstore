const { Router } = require("express");
const router = Router();
const StoreController = require("../controllers/store");

router.post("/order", StoreController.placeOrder);
router.get("/order/:orderId", StoreController.findOrderById);
router.delete("/order/:orderId", StoreController.deleteOrderById);
router.get("/inventory", StoreController.getInventory);

module.exports = router;
