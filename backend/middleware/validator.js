const { body, validationResult } = require("express-validator");
const fs = require("fs");

exports.checkSignup = [
  body("email")
    .isEmail().withMessage("Email incorrect !"),
  body("password")
    .isStrongPassword().withMessage("Le mot de passe doit faire minimum 8 caractères et doit contenir : 1 lettre MAJ, 1 lettre MIN, 1 chiffre et 1 caractère spécial !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

exports.checkSauce = [
  body("name")
    .isString()
    .isLength({ min: 3 }).withMessage("Minimum 3 caractères requis !"),
  body("manufacturer")
    .isString()
    .isLength({ min: 3 }).withMessage("Minimum 3 caractères requis !"),
  body("description")
    .isString()
    .isLength({ min: 3 }).withMessage("Minimum 3 caractères requis !"),
  body("mainPepper")
    .isString()
    .isLength({ min: 3 }).withMessage("Minimum 3 caractères requis !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      fs.unlinkSync(`${req.file.path}`, (err) => {
        console.log(err);
        return;
      });
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
