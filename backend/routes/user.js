const express = require("express");

const validator = require("../middleware/validator");
const userCtrl = require("../controllers/user");

const router = express.Router();

router.post("/signup", validator.signup, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
