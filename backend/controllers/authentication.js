const argon = require('argon2');
const authenticationModel = require('../models/authentication');
const usersModel = require('../models/users');

const verifyPassword = async (hashedPassword, password) => {
  const verification = await argon.verify(hashedPassword, password);
  return verification;
}

const verifyCredentials = async (req, res) => {

  const { email, password } = req.body;
  const hashedPassword = await argon.hash(password);
  authenticationModel.verifyQuery([email]).then((err, result) => {
    if (err) {
      res.status(500).send('error');
    }
    if (result.length !== 0) {
      if (verifyPassword(hashedPassword, password)){
        usersModel.getOneUserQueryByEmail(email).then(r=>r.status(200).json(r));
      }
    }
  })
}
module.exports = { verifyCredentials };