const connection = require ('../db-config');
const db = connection.promise();

const addGenreQuery = (values) => {
return db.query('INSERT INTO genres SET ?', [values]);
}
const getGenresQuery = () => {
  return db.query('SELECT * FROM genres');
}
const getOneGenreQuery = (value) => {
  return db.query('SELECT * FROM genres WHERE id = ? ', [value]);
}
const getSelectedGenreQuery = (first, last) =>{
  return db.query('SELECT * FROM genres LIMIT ?, ?', [first, last])
}
const updateGenreQuery = (id, values) =>{
  return db.query('UPDATE genres SET ? WHERE id = ?',[values, id]);
}
const deleteGenreQuery = (values) =>{
  return db.query('DELETE FROM genres WHERE id = ?', [values]);
}
module.exports = {addGenreQuery, getGenresQuery, getSelectedGenreQuery, getOneGenreQuery, updateGenreQuery, deleteGenreQuery};
