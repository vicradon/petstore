const { Router } = require("express");
const router = Router();
const StoreController = require("../controllers/store");

router.post("/order", StoreController.placeOrder);
router.get("/order/:orderId", StoreController.findOrderByOrderId);
router.delete("/order/:orderId", StoreController.deleteOrderByOrderId);
router.get("/inventory", StoreController.getPetInventoriesByStatus);

module.exports = router;
