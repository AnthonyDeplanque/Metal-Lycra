const connection = require ('../db-config');
const db = connection.promise();

const addBandQuery = (values) => {
return db.query('INSERT INTO bands SET ?', [values]);
}
const getBandsQuery = () => {
  return db.query('SELECT * FROM bands');
}
const getOneBandQuery = (value) => {
  return db.query('SELECT * FROM bands WHERE id = ? ', [value]);
}
const getSelectedBandQuery = (first, last) =>{
  return db.query('SELECT * FROM bands LIMIT ?, ?', [first, last])
}
const updateBandQuery = (id, values) =>{
  return db.query('UPDATE bands SET ? WHERE id = ?',[values, id]);
}
const getMusiciansFromBandQuery = (id) => {
  return db.query(`SELECT 
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
  WHERE b.id= ?`, id)
}
const deleteBandQuery = (values) =>{
  return db.query('DELETE FROM bands WHERE id = ?', [values]);
}
module.exports = {addBandQuery, getBandsQuery, getMusiciansFromBandQuery, getSelectedBandQuery, getOneBandQuery, updateBandQuery, deleteBandQuery};
