const express = require('express');
const { postGenre, getGenres, getOneGenre,updateGenre,deleteGenre } = require('../controllers/genres');

const router = express.Router();
router.get('/', getGenres);
router.get('/:id', getOneGenre);
router.post('/', postGenre);
router.put('/:id',updateGenre);
router.delete('/:id',deleteGenre);

module.exports = router;