const { Router } = require("express");
const router = Router();
const PetController = require("../controllers/pet");

// GET /pet
router.get("/", PetController.getAll);

// GET /pet/{petId}
router.get("/:petId", PetController.getById);

// POST /pet
router.post("/", PetController.create);

// POST /pet/{petId}/uploadImage
router.post("/:petId/uploadImage", PetController.uploadImage);

// PUT /pet
router.put("/", PetController.update);

// GET /pet/findByStatus
router.get("/findByStatus", PetController.findByStatus);

// PUT /pet/{petId}
router.put("/:petId", PetController.updateById);

// DELETE /pet/{petId}
router.delete("/:petId", PetController.delete);

module.exports = router;
