const db = require("../models");
const User = db.users;

const verifySignUp = (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return res.status(403).send("Campo email es requerido");
  }
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res.status(409).send("¡¡¡ERROR!!! ¡Email ya existe!");
      }
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(401).send("Email no valido, acceso denegado");
    });
};

module.exports = verifySignUp;
