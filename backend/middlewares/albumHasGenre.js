const Joi = require('joi');

const postAlbumHasGenreValidationObject = {
  idAlbum: Joi.number().required(),
  idGenre: Joi.number().required(),
}

const updateAlbumHasGenreValidationObject = {
  idAlbum: Joi.number(),
  idGenre: Joi.number(),
}

module.exports = { postAlbumHasGenreValidationObject, updateAlbumHasGenreValidationObject };