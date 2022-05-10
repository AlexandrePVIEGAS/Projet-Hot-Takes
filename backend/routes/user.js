const express = require("express");

const userCtrl = require("../controllers/user");

const validator = require("../middleware/validator");

const router = express.Router();

router.post("/signup", validator.checkSignup, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
