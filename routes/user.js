const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/user");

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

// Only to be done by a logged-in user
router.post("/", UserController.createUser);
router.get("/", UserController.listUsers);
router.post("/createWithArray", UserController.createWithArray);
router.post("/createWithList", UserController.createWithList);
router.get("/:username", UserController.getUserByUsername);
router.put("/:username", UserController.updateUserByUsername);
router.delete("/:username", UserController.deleteUserByUsername);

module.exports = router;
