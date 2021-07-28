const Joi = require('joi');

const postAlbumValidationObject = {
  name: Joi.string().max(80).required(),
  idBand: Joi.number().required(),
  releaseYear: Joi.number(),
  image: Joi.string().max(255).required(),
}

const updateAlbumValidationObject = {
  name: Joi.string().max(80),
  idBand: Joi.number(),
  releaseYear: Joi.number(),
  image: Joi.string().max(255),
}

module.exports = { postAlbumValidationObject, updateAlbumValidationObject };