const express = require('express');
const { postMusician, getMusicians, getMusiciansInBand,  getOneMusician,updateMusician,deleteMusician } = require('../controllers/musicians');

const router = express.Router();
router.get('/', getMusicians);
router.get('/:id', getOneMusician);
router.get('/inBand/:id', getMusiciansInBand);
router.post('/', postMusician);
router.put('/:id',updateMusician);
router.delete('/:id',deleteMusician);

module.exports = router;