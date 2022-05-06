const Sauce = require("../models/sauce");

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId === userIdFromTheToken) {
        next();
      } else {
        res.status(403).json({ message: "Utilisateur non autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};