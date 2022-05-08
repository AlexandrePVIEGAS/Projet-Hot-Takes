const { body, validationResult } = require("express-validator");

exports.signup = [
  body("email", "Email incorrect !").isEmail(),
  body("password", "Mot de passe incorrect !").isLength({ min: 8 }),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];
