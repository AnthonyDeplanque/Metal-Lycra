const Joi = require("joi");
const bandsModel = require("../models/bands");
const bandsMiddleware = require("../middlewares/bands");

const postBand = (req, res) => {
  const { name, formationYear, description, image } = req.body;
  const { error } = Joi.object(
    bandsMiddleware.postBandValidationObject
  ).validate(
    { name, formationYear, description, image },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    bandsModel
      .addBandQuery({ ...req.body })
      .then((results) => {
        const idBand = results.insertId;
        const createdBand = { idBand, ...req.body };
        res.status(201).json(createdBand);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the band");
      });
  }
};
const getBandMusicians = (req, res) => {
  const { id } = req.params;
  bandsModel
    .getMusiciansFromBandQuery(id)
    .then(([results]) => res.status(200).json(results))
    .catch((err) => console.error(err));
};
const getBands = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    bandsModel
      .getSelectedBandQuery(parseInt(first), parseInt(last))
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  } else {
    bandsModel
      .getBandsQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((error) => console.error(error));
  }
};

const getOneBand = (req, res) => {
  const { id } = req.params;
  bandsModel
    .getOneBandQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => console.error(error));
};
const updateBand = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  bandsModel
    .getOneBandQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        bandsMiddleware.updateBandValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      bandsModel
        .updateBandQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`band with id ${id} not found`);
          }
        });
    })
    .catch((err) => {
      if (err.message === "INVALID_DATA") {
        res.status(422).json({ validationErrors });
      } else res.status(500).send("Error updating a band");
    });
};

const deleteBand = (req, res) => {
  const { id } = req.params;
  bandsModel
    .deleteBandQuery(id)
    .then((result) => {
      if (result) {
        res.status(200).send("band deleted");
      } else {
        res.status(404).send("band not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("error deleting a band");
    });
};
module.exports = {
  postBand,
  getBands,
  getBandMusicians,
  getOneBand,
  updateBand,
  deleteBand,
};
