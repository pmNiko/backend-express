//estructura basica de un archivo routing dentro de express
const express = require("express");
const router = express.Router();
const model = require("./../models/partidos");
/*  end points del requerimiento
    /all
    /last
    /date
    /points
*/

const all = (req, res) =>
  model
    .all()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json({ message: "Error", e }));

router.get("/all", all);

module.exports = router;
