const express = require('express');
const { postBand, getBands, getOneBand,updateBand,deleteBand,getBandMusicians } = require('../controllers/bands');

const router = express.Router();
router.get('/', getBands);
router.get('/:id', getOneBand);
router.get('/hasMusician/:id', getBandMusicians);
router.post('/', postBand);
router.put('/:id',updateBand);
router.delete('/:id',deleteBand);

module.exports = router;