const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const { SECRET_KEY } = process.env;

function ensureAuth(req, res, next) {
     if (!req.headers.authorization) {
          return res.status(403).send({
               message: "La petición no tiene la cabecera de autenticación",
          });
     }

     const token = req.headers.authorization.replace(/['"]+/g, "");
     const payload = jwt.verify(token, SECRET_KEY);

     try {
          if (payload.exp <= moment().unix()) {
               return res.status(400).send({ message: "El token ha expirado" });
          }
     } catch (error) {
          return res.status(400).send({ message: "El token inválido" });
     }

     req.user = payload;
     next();
}

module.exports = {
     ensureAuth,
};
