const fs = require("fs");
const jwt = require("jsonwebtoken");
const key = fs.readFileSync("./keys/public.pem");

const secured = (req, res, next) => {
  try {
    //destructuro el param authorization
    const { authorization } = req.headers;
    console.log(authorization);
    // verifico el token con la clave publica
    const { _id } = jwt.verify(authorization, key);
    //guardo el _id dentro del req.id, crea una propiedad global
    req.id = _id;
    // si verifica next() sigo el flujo de ejecución
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "No autorizado" });
  }
};

module.exports = { secured };
