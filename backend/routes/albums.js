const express = require('express');
const { postAlbum, getAlbums,getAlbumsByGenre, getOneAlbum, updateAlbum, deleteAlbum } = require('../controllers/albums');

const router = express.Router();
router.get('/', getAlbums);
router.get('/genre/:id', getAlbumsByGenre);
router.get('/:id', getOneAlbum);
router.post('/', postAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;