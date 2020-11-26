// Schema de validación a través de la librería hapi Joi
const Joi = require("@hapi/joi");

const numbers = Joi.number().positive().required();

// schema validación de datos
const schemas = {
  //a través de Joi creamos un objeto de validación
  create: Joi.object().keys({
    goals: numbers,
    against: numbers,
    date: Joi.date().required(),
    rival: Joi.string().required(),
    points: numbers,
  }),
};

module.exports = { schemas };
