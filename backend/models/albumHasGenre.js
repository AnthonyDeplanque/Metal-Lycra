const connection = require("../db-config");
const db = connection.promise();

const addAlbumHasGenreQuery = (values) => {
  return db.query("INSERT INTO albumHasGenre SET ?", [values]);
};
const getAlbumHasGenresQuery = () => {
  return db.query("SELECT * FROM albumHasGenre");
};
const getOneAlbumHasGenreQuery = (value) => {
  return db.query("SELECT * FROM albumHasGenre WHERE id = ? ", [value]);
};
const getOneAlbumHasGenreByIdAlbumQuery = (value) => {
  return db.query("SELECT * FROM albumHasGenre WHERE idAlbum = ? ", [value]);
};
const getOneAlbumHasGenreByIdGenreQuery = (value) => {
  return db.query("SELECT * FROM albumHasGenre WHERE idGenre = ? ", [value]);
};
const updateAlbumHasGenreQuery = (id, values) => {
  return db.query("UPDATE albumHasGenre SET ? WHERE id = ?", [values, id]);
};
const deleteAlbumHasGenreQuery = (values) => {
  return db.query("DELETE FROM albumHasGenre WHERE id = ?", [values]);
};
module.exports = {
  addAlbumHasGenreQuery,
  getAlbumHasGenresQuery,
  getOneAlbumHasGenreQuery,
  updateAlbumHasGenreQuery,
  deleteAlbumHasGenreQuery,
  getOneAlbumHasGenreByIdAlbumQuery,
  getOneAlbumHasGenreByIdGenreQuery
};
