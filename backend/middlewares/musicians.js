const Joi = require('joi');

const postMusicianValidationObject = {
  firstName: Joi.string().max(80).required(),
  lastName: Joi.string().max(80).required(),
  instrument: Joi.string().max(80).required(),
}

const updateMusicianValidationObject = {
  firstName: Joi.string().max(80),
  lastName: Joi.string().max(80),
  instrument: Joi.string().max(80),
}

module.exports = { postMusicianValidationObject, updateMusicianValidationObject };