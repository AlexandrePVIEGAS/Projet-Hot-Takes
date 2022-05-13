const fs = require("fs");

const Sauce = require("../models/sauce");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((Sauces) => {
      res.status(200).json(Sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((Sauce) => res.status(200).json(Sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = req.body;
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file
    ? Sauce.findOne({ _id: req.params.id })
        .then(
          (sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlinkSync(`images/${filename}`);
          },
          (sauceObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          })
        )
        .catch((error) => res.status(500).json({ error }))
    : (sauceObject = { ...req.body });
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } })
        .then(() => res.status(200).json({ message: "J'aime" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
              .then(() => res.status(200).json({ message: "Annulé" }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
              .then(() => res.status(200).json({ message: "Annulé" }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    case -1:
      Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Je n'aime pas" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    default:
      console.log("Erreur");
  }
};
