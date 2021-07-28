const express = require('express');
const {
  getAlbumHasGenres,
  getOneAlbumHasGenre,
  postAlbumHasGenre,
  updateAlbumHasGenre,
  deleteAlbumHasGenre,
} = require("../controllers/albumHasGenre");

const router = express.Router();
router.get('/', getAlbumHasGenres);
router.get('/:id', getOneAlbumHasGenre);
router.post('/', postAlbumHasGenre);
router.put('/:id', updateAlbumHasGenre);
router.delete('/:id', deleteAlbumHasGenre);

module.exports = router;