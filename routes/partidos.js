//estructura basica de un archivo routing dentro de express
const express = require("express");
const router = express.Router();
// contengo el objeto en una const model
const model = require("./../models/partidos");
//middleware de validación de datos de partido
const middlewares = require("../middlewares/partidos");
/*  end points del requerimiento
    /all
    /last
    /date
    /points
*/

// Función all para la ruta /all
const all = (req, res) =>
  //Accedo al metodo all() de la const model
  model
    .all()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json({ message: "Error", e }));

// Función last para la ruta /last
const last = (req, res) =>
  model
    .last()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json({ message: "Error", e }));

// Función para la busqueda por fechas
const filter = async (req, res) => {
  try {
    const { start, end } = req.query;
    const partidos = await model.findByDate(start, end);
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: "ocurrio un error", error });
  }
};

const create = (req, res) =>
  model
    .create(req.body)
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json(e));

//Rutas
router.get("/filter", filter);
router.get("/last", last);
router.get("/all", all);
router.post("/create", middlewares.create, create);

module.exports = router;
