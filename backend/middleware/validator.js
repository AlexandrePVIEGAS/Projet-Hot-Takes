const { body, validationResult } = require("express-validator");
const fs = require("fs");

exports.checkSignup = [
  body("email").isEmail().withMessage("Email incorrect !"),
  body("password").isLength({ min: 8 }).withMessage("Minimum 8 charactères recquis pour le mot de passe !"),
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
  body("name").isLength({ min: 3 }).withMessage("Minimum 3 charactères recquis !"),
  body("manufacturer").isLength({ min: 3 }).withMessage("Minimum 3 charactères recquis !"),
  body("description").isLength({ min: 3 }).withMessage("Minimum 3 charactères recquis !"),
  body("mainPepper").isLength({ min: 3 }).withMessage("Minimum 3 charactères recquis !"),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.method === "POST") {
        fs.unlinkSync(`${req.file.path}`, (err) => {
          console.log(err);
          return;
        });
      }
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
