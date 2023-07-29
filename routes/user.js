const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/user");

router.post("/login", UserController.login);

module.exports = router;
