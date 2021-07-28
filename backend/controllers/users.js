const Joi = require("joi");
const usersModel = require("../models/users");
const usersMiddleware = require("../middlewares/users");
const argon2 = require("argon2");
const jwtServices = require('../services/jwt');

const postUser = async (req, res) => {
  const {
    nickName,
    email,
    password,
    role,
    firstName,
    lastName,
    dateOfInscription,
  } = req.body;
  const hashedPassword = await argon2.hash(password);
  const { error } = Joi.object(
    usersMiddleware.postUserValidationObject
  ).validate(
    {
      nickName,
      email,
      hashedPassword,
      role,
      firstName,
      lastName,
      dateOfInscription,
    },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    usersModel
      .getOneUserQueryByEmail(email)
      .then(([results]) => {
        if (results.length) {
          res.status(409).send("user already exist with this email");
        } else {
          usersModel
            .addUserQuery({
              nickName,
              email,
              hashedPassword,
              role,
              firstName,
              lastName,
              dateOfInscription,
            })
            .then((results) => {
              const idUser = results.insertId;
              const createdUser = {
                idUser,
                nickName,
                hashedPassword,
                email,
                role,
                firstName,
                lastName,
                dateOfInscription,
              };
              res.status(201).json(createdUser);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send("error creating a user");
            });
        }
      })
      .catch((err) => console.error(err));
  }
};

const loginUser = (req, res) => {
  const { credentialEmail, credentialPassword } = req.body;
  usersModel
    .getHashedPasswordByEmail(credentialEmail)
    .then(async ([[result]]) => {
      argon2
        .verify(result.hashedPassword, credentialPassword)
        .then((match) => {
          if (match) {
            usersModel
            .getOneUserQueryByEmail(credentialEmail)
            .then(([[results]]) => {
                const token = jwtServices.createToken(results.id)
                res.status(200).json({...results, token:token, message: "ACCESS_GRANTED" });
              });
          } else {
            res.status(401).json({ message: "ACCESS_DENIED" });
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const getUsers = (req, res) => {
  const { first, last, email } = req.query;
  if (email) {
    usersModel
      .getOneUserQueryByEmail(email)
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
  if (first && last) {
    usersModel
      .getSelectedUserQuery(parseInt(first), parseInt(last))
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  } else {
    usersModel
      .getUsersQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  usersModel
    .getOneUserQueryById(id)
    .then(([results]) => res.status(200).json(results))
    .catch((err) => console.error(err));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  usersModel
    .getOneUserQueryById(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        usersMiddleware.updateUserValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      usersModel
        .updateUserQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`User with id ${id} not found`);
          }
        });
    })
    .catch((err) => {
      if (err.message === "INVALID_DATA") {
        res.status(422).json({ validationErrors });
      } else res.status(500).send("error updating a User");
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  usersModel
    .deleteUserQuery(id)
    .then((results) => {
      if (results) res.status(200).send("User deleted");
      else res.status(404).send("User not found");
    })
    .catch((err) => console.error(err));
};

module.exports = {
  loginUser,
  postUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
