const Joi = require("joi");
const albumsModel = require("../models/albums");
const albumsMiddleware = require("../middlewares/albums");

const postAlbum = (req, res) => {
  const { name, idBand, releaseYear, image } = req.body;
  const { error } = Joi.object(
    albumsMiddleware.postAlbumValidationObject
  ).validate({ name, idBand, releaseYear, image }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    albumsModel
      .addAlbumQuery({ ...req.body })
      .then((results) => {
        const idAlbum = results.insertId;
        const createdAlbum = { idAlbum, ...req.body };
        res.status(201).json(createdAlbum);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the album");
      });
  }
};

const getAlbums = (req, res) => {
  const { first, last } = req.query;
  if (first && last) {
    albumsModel
      .getSelectedAlbumQuery(parseInt(first), parseInt(last))
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  } else {
    albumsModel
      .getAlbumsQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
};
const getAlbumsByGenre = (req,res)=>{
  const {id} = req.params;
  albumsModel.getAlbumsByGenreAlbumQuery(id)
  .then(([results])=>res.status(200).json(results))
  .catch((err)=>console.error(err))
}

const getOneAlbum = (req, res) => {
  const { id } = req.params;
  albumsModel
    .getOneAlbumQuery(id)
    .then(([results]) => res.status(200).json(results))
    .catch((err) => console.error(err));
};

const updateAlbum = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  albumsModel
    .getOneAlbumQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        albumsMiddleware.updateAlbumValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      albumsModel
        .updateAlbumQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`album with id ${id} not found`);
          }
        });
      })
      .catch((err)=> {
          if (err.message === "INVALID_DATA") {
            res.status(422).json({ validationErrors });
          } else res.status(500).send("error updating an Album");
    });
};

const deleteAlbum = (req, res) => {
  const { id } = req.params;
  albumsModel
    .deleteAlbumQuery(id)
    .then((results) => {
      if (results) {
        res.status(200).send("Album deleted");
      } else {
        res.status(404).send("Album not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error deleting an album");
    });
};

module.exports = {
  postAlbum,
  getAlbums,
  getAlbumsByGenre,
  getOneAlbum,
  updateAlbum,
  deleteAlbum,
};
