const Joi = require('joi');

const postUserValidationObject = {
  nickName: Joi.string().max(80).required(),
  email: Joi.string().email({ minDomainSegments: 2}).max(100).required(),
  hashedPassword: Joi.string().max(150).required(),
  role: Joi.number().required(),
  firstName: Joi.string().max(80).required(),
  lastName: Joi.string().max(80).required(),
  dateOfInscription : Joi.number().required(),
}

const updateUserValidationObject = {
  nickName: Joi.string().max(80),
  email: Joi.string().email({ minDomainSegments: 2}).max(100),
  hashedPassword: Joi.string().max(150),
  role: Joi.number(),
  firstName: Joi.string().max(80),
  lastName: Joi.string().max(80),
  dateOfInscription : Joi.number(),
}

module.exports = { postUserValidationObject, updateUserValidationObject };