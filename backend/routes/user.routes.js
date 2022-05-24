const express = require("express");

const validator = require("../middleware/validator");
const userCtrl = require("../controllers/user.controllers");

const router = express.Router();

router.post("/signup", validator.checkSignup, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
