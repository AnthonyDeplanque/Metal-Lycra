const Joi = require("joi");
const albumHasGenreModel = require("../models/albumHasGenre");
const albumHasGenreMiddleware = require("../middlewares/albumHasGenre");

const postAlbumHasGenre = (req, res) => {
  const { idAlbum, idGenre } = req.body;
  const { error } = Joi.object(
    albumHasGenreMiddleware.postAlbumHasGenreValidationObject
  ).validate({ idAlbum, idGenre }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    albumHasGenreModel
      .addAlbumHasGenreQuery({ ...req.body })
      .then((results) => {
        const idAlbumHasGenre = results.insertId;
        const createdAlbumHasGenre = { idAlbumHasGenre, ...req.body };
        res.status(201).json(createdAlbumHasGenre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the link");
      });
  }
};
const getAlbumHasGenres = (req, res) => {
  const { genre, album } = req.query;
  if (!album && genre) {
    albumHasGenreModel
      .getOneAlbumHasGenreByIdGenreQuery(parseInt(genre))
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  } else if (!genre && album) {
    albumHasGenreModel
      .getOneAlbumHasGenreByIdAlbumQuery(parseInt(album))
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  } else {
    albumHasGenreModel
      .getAlbumHasGenresQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
};
const getOneAlbumHasGenre = (req, res) => {
  const { id } = req.params;
  albumHasGenreModel
    .getOneAlbumHasGenreQuery(id)
    .then(([results]) => res.status(200).json(results))
    .catch((err) => console.error(err));
};
const updateAlbumHasGenre = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  albumHasGenreModel
    .getOneAlbumHasGenreQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        albumHasGenreMiddleware.updateAlbumHasGenreValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      albumHasGenreModel
        .updateAlbumHasGenreQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`link with id ${id} not found`);
          }
          if (err.message === "INVALID_DATA") {
            res.status(422).json({ validationErrors });
          } else res.status(500).send("error updating a link");
        });
    });
};
const deleteAlbumHasGenre = (req, res) => {
  const { id } = req.params;
  albumHasGenreModel
    .deleteAlbumHasGenreQuery(id)
    .then((results) => {
      if (results) {
        res.status(200).send("link deleted");
      } else {
        res.status(404).send("link not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.statut(500).send("error deleting a link");
    });
};

module.exports = {
  getAlbumHasGenres,
  getOneAlbumHasGenre,
  postAlbumHasGenre,
  updateAlbumHasGenre,
  deleteAlbumHasGenre,
};
