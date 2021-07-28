const connection = require("../db-config");
const db = connection.promise();

const addAlbumQuery = (values) => {
  return db.query("INSERT INTO albums SET ?", [values]);
};
const getAlbumsQuery = () => {
  return db.query("SELECT a.id, a.name, a.releaseYear, a.image, b.name AS bandName FROM albums AS a INNER JOIN bands AS b ON b.id= a.idBand");
};
const getAlbumsByGenreQuery = () => {
  return db.query(
    "SELECT a.id AS IdAlbum, a.name AS NameAlbum,g.id AS Idgenre, g.name AS NameGenre FROM albumHasGenre j INNER JOIN genres g ON j.idGenre = g.id INNER JOIN albums a ON j.idAlbum=a.id"
  );
};
const getAlbumsByGenreAlbumQuery = (id) => {
  return db.query(
    "SELECT g.id AS idGenre, g.name AS nameGenre FROM albumHasGenre j INNER JOIN genres g ON j.idGenre = g.id INNER JOIN albums a ON j.idAlbum=a.id WHERE a.id = ?"
  ,[id]);
};
const getOneAlbumQuery = (value) => {
  return db.query("SELECT a.id, a.name, a.releaseYear, a.image, b.name AS bandName FROM albums AS a INNER JOIN bands AS b ON b.id = a.idBand WHERE a.id = ? ", [value]);
};
const getSelectedAlbumQuery = (first, last) => {
  return db.query("SELECT * FROM albums LIMIT ?, ?", [first, last]);
};
const updateAlbumQuery = (id, values) => {
  return db.query("UPDATE albums SET ? WHERE id = ?", [values, id]);
};
const deleteAlbumQuery = (values) => {
  return db.query("DELETE FROM albums WHERE id = ?", [values]);
};
module.exports = {
  addAlbumQuery,
  getAlbumsQuery,
  getAlbumsByGenreQuery,
  getSelectedAlbumQuery,
  getOneAlbumQuery,
  updateAlbumQuery,
  deleteAlbumQuery,
  getAlbumsByGenreAlbumQuery,
};
