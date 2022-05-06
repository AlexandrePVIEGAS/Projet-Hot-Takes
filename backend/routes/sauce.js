const express = require("express");

const auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");

const router = express.Router();

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, verifyUser, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, verifyUser, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;