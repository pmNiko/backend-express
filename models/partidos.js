/* El modelo de datos hace todas las
  consultas a la colección de partidos /matches
*/
// Primero requerimos la referencia a la BD
const { pool } = require("./../utils/bd");

//datos de entrada hay quer validarlos -> validar
const create = async ({ goals, against, date, rival, points }) =>
  (await pool()).collection("equipo").insertOne({
    goals,
    against,
    date: new Date(date),
    rival,
    points,
  });

//Función get find({conditions},{projections}), sort, limit
// Esta es una funcion base
const find = async ({
  conditions = {},
  projection = {},
  sort = {},
  limit = 20,
}) => {
  try {
    return (await pool())
      .collection("equipo")
      .find(conditions, { projection })
      .sort(sort)
      .limit(limit)
      .toArray();
  } catch (error) {
    console.error(error);
  }
};

//Función busqueda por fecha
const findByDate = (start, end) =>
  find({
    conditions: {
      date: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    },
  });

//función last
const last = () => find({ sort: { _id: -1 }, limit: 1 });

// función all
const all = () => find({});

//el modelo lo vamos a consumir dentro del controller
module.exports = { findByDate, all, last, create };
