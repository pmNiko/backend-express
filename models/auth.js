const { pool } = require("../utils/bd");

//Función login
const login = async (usuario, password) => {
  try {
    return (await pool()).collection("usuarios").findOne({ usuario, password });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { login };
