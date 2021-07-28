const express = require('express');
const {verifyCredentials} = require('../controllers/authentication');


const router = express.Router();
router.post('/',verifyCredentials);

module.exports = router;