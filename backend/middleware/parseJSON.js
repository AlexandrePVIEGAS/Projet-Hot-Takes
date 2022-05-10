module.exports = (req, res, next) => {
  if (req.body && req.body["sauce"]) {
    req.body = JSON.parse(req.body["sauce"]);
    next();
  } else {
    next();
  }
};
