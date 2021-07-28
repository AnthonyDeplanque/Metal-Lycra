const Joi = require("joi");
const genresModel = require("../models/genres");
const genresMiddleware = require("../middlewares/genres");

const postGenre = (req, res) => {
  const { name, description } = req.body;
  const { error } = Joi.object(
    genresMiddleware.postGenreValidationObject
  ).validate({ name, description }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    genresModel
      .addGenreQuery({ ...req.body })
      .then((results) => {
        const idGenre = results.insertId;
        const createdGenre = { idGenre, ...req.body };
        res.status(201).json(createdGenre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the genre");
      });
  }
};

const getGenres = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    genresModel
      .getSelectedGenreQuery(parseInt(first), parseInt(last))
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    genresModel
      .getGenresQuery()
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const getOneGenre = (req, res) => {
  const { id } = req.params;
  genresModel
    .getOneGenreQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateGenre = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  genresModel
    .getOneGenreQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        genresMiddleware.updateGenreValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      genresModel
        .updateGenreQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`Genre with id ${id} not found`);
          }
        });
      })
      .catch(err=>{
          if (err.message === "INVALID_DATA") {
            res.status(422).json({ validationErrors });
          } else res.status(500).send("error updating a Genre");
    });
};

const deleteGenre = (req, res) => {
  const { id } = req.params;
  genresModel
    .deleteGenreQuery(id)
    .then((result) => {
      if (result) {
        res.status(200).send("Genre deleted");
      } else {
        res.status(404).send("Genre not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("error deleting Genre");
    });
};

module.exports = {
  postGenre,
  getGenres,
  getOneGenre,
  updateGenre,
  deleteGenre,
};
