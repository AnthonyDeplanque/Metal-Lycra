const Joi = require("joi");
const musicianModel = require("../models/musicians");
const musicianMiddleware = require("../middlewares/musicians");

const postMusician = (req, res) => {
  const { firstName, lastName, instrument } = req.body;
  const { error } = Joi.object(
    musicianMiddleware.postMusicianValidationObject
  ).validate({ firstName, lastName, instrument }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    musicianModel
      .addMusicianQuery({ ...req.body })
      .then((results) => {
        const idMusician = results.insertId;
        const createdMusician = { idMusician, ...req.body };
        res.status(201).json(createdMusician);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the musician");
      });
  }
};
const getMusicians = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    musicianModel
      .getSelectedMusicianQuery(parseInt(first), parseInt(last))
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  } else {
    musicianModel
      .getMusiciansQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  }
};
const getMusiciansInBand = (req, res) => {
  const { id } = req.params;
  musicianModel
    .getBandsFromMusicianQuery(id)
    .then(([results]) => res.status(200).json(results))
    .catch((error) => console.error(error));
};
const getOneMusician = (req, res) => {
  const { id } = req.params;
  musicianModel
    .getOneMusicianQuery(id)
    .then(([results]) => res.status(200).json(results))
    .catch((error) => console.error(error));
};
const updateMusician = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  musicianModel
    .getOneMusicianQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        musicianMiddleware.updateMusicianValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      musicianModel
        .updateMusicianQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`Musician with id ${id} not found`);
          }
        });
    })
    .catch((err) => {
      if (err.message === "INVALID_DATA") {
        res.status(422).json({ validationErrors });
      } else res.status(500).send("error updating a Musician");
    });
};
const deleteMusician = (req, res) => {
  const { id } = req.params;
  musicianModel.deleteMusicianQuery(id).then((results) => {
    if (results) res.status(200).send("Musician deleted");
    else res.status(404).send("Musician not found");
  });
};
module.exports = {
  postMusician,
  getMusicians,
  getOneMusician,
  updateMusician,
  deleteMusician,
  getMusiciansInBand,
};
