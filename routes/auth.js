const express = require("express");
const router = express.Router();
// libreria de node para leer una clave privada y
// generar el token
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const model = require("../models/auth");

//opciones de expiración
const singOption = { expiresIn: "6h", algorithm: "RS256" };
const key = fs.readFileSync("./keys/private.pem");
// creación del token con jwt
const createToken = (payload) => jwt.sign(payload, key, singOption);

//Función de auth
const auth = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await model.login(usuario, sha1(password));

    if (!user) res.status(401).json({ message: "Usuario no definido" });

    const { _id } = user;
    const token = createToken({ _id, usuario }); // {_id: ObjectId, usuario: 'nikolas'}
    res.json({ JWT: token });
  } catch (error) {
    console.error(error);
  }
};

//ruta de auth por post
router.post("/", auth);

module.exports = router;

/* trabajamos con una auth por token
  con dos clave una privada para generar 
  el token y una publica para desencriptar 
  la data que llega desde el cliente dentro 
  de los headers*/
