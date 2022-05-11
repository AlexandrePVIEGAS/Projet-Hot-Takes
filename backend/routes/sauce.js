const express = require("express");

const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const upload = require("../middleware/multer-config");
const parseJSON = require("../middleware/parseJSON");
const validator = require("../middleware/validator");
const sauceCtrl = require("../controllers/sauce");

const router = express.Router();

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, upload, parseJSON, validator.checkSauce, sauceCtrl.createSauce);
router.put("/:id", auth, verifyUser, upload, parseJSON, validator.checkSauce, sauceCtrl.modifySauce);
router.delete("/:id", auth, verifyUser, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
