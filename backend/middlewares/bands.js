const Joi = require('joi');

const postBandValidationObject = {
  name: Joi.string().max(80).required(),
  formationYear: Joi.number(),
  description: Joi.string().required(),
  image: Joi.string().max(255).required(),
}

const updateBandValidationObject = {
  name: Joi.string().max(80),
  formationYear: Joi.number(),
  description: Joi.string(),
  image: Joi.string().max(255),
}

module.exports = { postBandValidationObject, updateBandValidationObject };