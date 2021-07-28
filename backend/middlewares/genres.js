const Joi = require('joi');

const postGenreValidationObject = {
  name: Joi.string().max(80).required(),
  description: Joi.string().required(),
}

const updateGenreValidationObject = {
  name: Joi.string().max(255),
  description: Joi.string(),
}

module.exports =  {postGenreValidationObject, updateGenreValidationObject};