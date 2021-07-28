const connection = require("../db-config");
const db = connection.promise();

const verifyQuery = (values) => {
  return db.query('SELECT * FROM users WHERE email = ?', [values]); 
}

module.exports = {verifyQuery};