/* Replace with your SQL commands */

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bands;
DROP TABLE IF EXISTS musicians;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS isInBand;
DROP TABLE IF EXISTS albumHasGenre;

/*
DROP TABLE IF EXISTS hasFavoriteBand;
DROP TABLE IF EXISTS hasFavoriteAlbum;
SELECT 
  a.id, a.name, a.releaseYear, a.image, b.name AS bandName, g.name AS genreName 
  FROM albums AS a 
  INNER JOIN bands AS b 
  ON a.idBand = b.id 
  RIGHT JOIN albumHasGenre AS ahg 
  ON ahg.idAlbum = a.id 
  JOIN genres AS g 
  ON g.id = ahg.idGenre 
  WHERE a.id = 1;


SELECT 
m.firstName, 
m.lastName, 
m.instrument, 
iib.idMusician, 
iib.idBand,
b.name
FROM musicians AS m
INNER JOIN isInBand AS iib
ON  m.id = iib.idMusician
INNER JOIN bands AS b
ON b.id = iib.idBand
WHERE b.id=1;
*/