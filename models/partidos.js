/* El modelo de datos hace todas las
  consultas a la colección de partidos /matches
*/
// Primero requerimos la referencia a la BD
const { pool } = require("./../utils/bd");

//datos de entrada hay quer validarlos -> validar
const create = async () => (await pool()).collection("equipo").insertOne(obj);

//Función get find({conditions},{projections}), sort, limit
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

//función last
const last = () => find({ sort: { _id: -1 }, limit: 1 });

// función all
const all = () => find({});

//el modelo lo vamos a consumir dentro del controller
module.exports = { all, last, create };
