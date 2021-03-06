//Referencia al inicio de la conexión
const MongoClient = require("mongodb").MongoClient;

// Pool función referencia al inicio de la conexión
const pool = async () => {
  try {
    return (
      await MongoClient.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}`)
    ).db("partidos");
  } catch (e) {
    /*se usa console.error porque es lo que 
      se va a ver en la consola de nodemon
    */
    console.error(e.stack);
  }
};

//Exportamos el modulo de conexión a la bd
module.exports = { pool };
