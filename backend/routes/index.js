const bandsRouter = require('./bands');
const genresRouter = require('./genres');
const usersRouter = require('./users');
const musiciansRouter = require('./musicians');
const albumsRouter = require('./albums');
const albumHasGenreRouter = require('./albumHasGenre');
const { getMusiciansInBand } = require('../controllers/musicians');
const { getAlbumsByGenre } = require('../controllers/albums');
// const authenticationRouter = require("./authentication");

const router = (app) => {
  app.use('/api/bands', bandsRouter);
  app.use('/api/genres', genresRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/musicians', musiciansRouter);
  app.use('/api/albums', albumsRouter);
  app.use('/api/albumhasgenre',albumHasGenreRouter)
  app.use('/api/isinband',getMusiciansInBand);
  app.use('/api/albumbygenre',getAlbumsByGenre);
  //app.use('/api',(req,res)=> res.send('hello world') )
//  app.use('/connect', authenticationRouter);
};
module.exports = {router};