const { Router } = require("express");
const router = Router();
const PetController = require("../controllers/pet");

router.get("/", PetController.getAll);
router.get("/{petId}", PetController.getById);
router.post("/", PetController.create);

module.exports = router;
