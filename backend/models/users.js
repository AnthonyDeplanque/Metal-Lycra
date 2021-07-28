const connection = require ('../db-config');
const db = connection.promise();

const addUserQuery = (values) => {
return db.query('INSERT INTO users SET ?', [values]);
}
const getUsersQuery = () => {
  return db.query('SELECT id, nickName, email, role, firstName, lastName, dateOfInscription FROM users');
}
const getOneUserQueryById = (value) => {
  return db.query('SELECT id, nickName, email, role, firstName, lastName, dateOfInscription FROM users WHERE id = ? ', [value]);
}
const getHashedPasswordByEmail=(value)=>{
  return db.query('SELECT hashedPassword FROM users where email = ?', [value])
}
const getOneUserQueryByEmail = (value) => {
  return db.query('SELECT id, nickName, email, role, firstName, lastName, dateOfInscription FROM users WHERE email = ? ', [value]);
}
const getSelectedUserQuery = (first, last) =>{
  return db.query('SELECT id, nickName, email, role, firstName, lastName, dateOfInscription FROM users LIMIT ?, ?', [first, last])
}
const updateUserQuery = (id, values) =>{
  return db.query('UPDATE users SET ? WHERE id = ?',[values, id]);
}
const deleteUserQuery = (values) =>{
  return db.query('DELETE FROM users WHERE id = ?', [values]);
}
module.exports = { getHashedPasswordByEmail,addUserQuery, getUsersQuery, getSelectedUserQuery, getOneUserQueryByEmail, getOneUserQueryById, updateUserQuery, deleteUserQuery};
