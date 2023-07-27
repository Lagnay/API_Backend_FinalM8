const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Un token es requerido para la autorización");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token no valido, acceso denegado");
  }
  return next();
};

module.exports = verifyToken;
