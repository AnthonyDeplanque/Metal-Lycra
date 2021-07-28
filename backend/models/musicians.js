const connection = require("../db-config");
const db = connection.promise();

const addMusicianQuery = (values) => {
  return db.query("INSERT INTO musicians SET ?", [values]);
};
const getMusiciansQuery = () => {
  return db.query("SELECT * FROM musicians");
};
const getOneMusicianQuery = (value) => {
  return db.query("SELECT * FROM musicians WHERE id = ? ", [value]);
};
const getBandsFromMusicianQuery = (id) => {
  return db.query(
    `SELECT 
    m.firstName, 
    m.lastName, 
    m.instrument, 
    iib.idMusician, 
    iib.idBand,
    b.name
    FROM musicians AS m
    INNER JOIN isInBand AS iib
    ON  m.id = iib.idMusician
    INNER JOIN bands AS b
    ON b.id = iib.idBand
    WHERE m.id= ?`,
    [id]
  );
};

const getSelectedMusicianQuery = (first, last) => {
  return db.query("SELECT * FROM musicians LIMIT ?, ?", [first, last]);
};
const updateMusicianQuery = (id, values) => {
  return db.query("UPDATE musicians SET ? WHERE id = ?", [values, id]);
};
const deleteMusicianQuery = (values) => {
  return db.query("DELETE FROM musicians WHERE id = ?", [values]);
};
module.exports = {
  addMusicianQuery,
  getBandsFromMusicianQuery,
  getMusiciansQuery,
  getSelectedMusicianQuery,
  getOneMusicianQuery,
  updateMusicianQuery,
  deleteMusicianQuery,
};
