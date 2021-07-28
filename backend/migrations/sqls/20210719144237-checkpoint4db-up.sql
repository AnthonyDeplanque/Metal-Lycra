  /* 0 => User... 1=> Editor... 2=> Admin */ 
CREATE TABLE IF NOT EXISTS users(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nickName` VARCHAR(80) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `hashedPassword` VARCHAR(150) NOT NULL,
  `role` INT NOT NULL, 
  `firstName` VARCHAR(64),
  `lastName` VARCHAR(64),
  `dateOfInscription` BIGINT,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS bands(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `formationYear` INT,
  `description` LONGTEXT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS genres(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS musicians(
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(80) NOT NULL,
  `lastName` VARCHAR(80) NOT NULL,
  `instrument` VARCHAR(80) NOT NULL,
  PRIMARY KEY(`id`));

CREATE TABLE IF NOT EXISTS albums(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80),
  `idBand` INT NOT NULL,
  `releaseYear` INT,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
 

CREATE TABLE IF NOT EXISTS isInBand(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idMusician` INT NOT NULL,
  `idBand` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS albumHasGenre(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idAlbum` INT NOT NULL,
  `idGenre` INT NOT NULL,
  PRIMARY KEY (`id`));

TRUNCATE TABLE users;

TRUNCATE TABLE bands;
TRUNCATE TABLE musicians;
TRUNCATE TABLE genres;
TRUNCATE TABLE albums;

TRUNCATE TABLE isInBand;
TRUNCATE TABLE albumHasGenre;

/*
TRUNCATE TABLE hasFavoriteBand;
TRUNCATE TABLE hasFavoriteAlbum;
*/

/* password1234 */
INSERT INTO users(nickName, email, hashedPassword, role, firstName, lastName, dateOfInscription) VALUES
  ('seteemio', 'seteemio@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 2,'Anthony', 'Deplanque', 1626763072704),
  ('JohnD00', 'John.doe@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'John', 'Doe', 1626763072704),
  ('Manouschk4', 'Manouschka@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Manou', 'Schka', 1626763072704),
  ('xXxEMODU59xXx', 'cesoirjmetaillelesveines@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Christian', 'Jambon', 1626763072704),
  ('ZoeMet4l62', 'lafofollehihihi@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Zoé', 'Harty', 1626763072704),
  ('Occurence', 'ginettewoismoulle@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Ginette', 'Woismoulle', 1626763072704);

INSERT INTO bands(name, formationYear, description, image) VALUES
  ("Mastodon", 1999, "Mastodon est un groupe de sludge metal américain, originaire d'Atlanta, en Géorgie. Le groupe se compose du bassiste et chanteur Troy Sanders, du guitariste et chanteur Brent Hinds, du guitariste Bill Kelliher, et du batteur et chanteur Brann Dailor. Le groupe est reconnu pour son mélange unique de rock et metal aux sonorités sludge, progressives et heavy, à haute teneur en passages psychédéliques.", "https://www.metalorgie.com/grp_tof/448-photo_Mastodon.jpg"),
  ("Ahab",2004,"Ahab est un groupe de funeral doom metal allemand, originaire de Heidelberg et Bade-Wurtemberg. Il est formé en 2004 par les deux guitaristes du groupe Midnattsol. Le nom du groupe provient du nom du capitaine dans le livre de Herman Melville, Moby Dick. Sa musique et ses paroles sont également inspirées par la thématique du livre (de la littérature et de l'océan).","https://www.metalorgie.com//grp_tof/Ahab.jpg"),
  ("Conan",2006,"Liverpool 2006, Richie Grundy (Batterie) et Jon Davis (Guitare / Chant) fondent Conan, au départ un duo Stoner / Doom / Sludge. Rejoints par John McNulty (Basse / Chant), ils enregistrent un ep Battle In The Swamp en 2007. Après des difficultés de line-up, ce n'est qu'en 2010 que le groupe se stabilise avec l'arrivée de Paul O'Neill à la batterie et Conan enregistre une démo ainsi que l'ep Horseback Battle Hammer chez Aurora Borealis Records et Throne Records. John quitte le groupe en 2011, remplacé par Dave Perry avec qui ils sortent uniquement un split avec Slomatics la même année. Phil Coumbe rejoint les rangs fin 2011. En 2012, leur premier album Monnos parait chez Burning World Records et qui voit naître les références à Sunn O))), Sleep et Yob. Le groupe est présent au Roadburn 2012 dont la captation sort en 2013 sur le label du festival. Un split avec Bongripper voit le jour la même année. En 2014 Conan sort un second effort, Blood Eagle, chez Napalm Records et se produit une seconde fois au Roadburn. Chris Fielding prend le poste de bassiste dans le groupe à cette époque tandis que le groupe se voit jouer sur la scène du Maryland Deathfest et du Psycho California. 2016 marque la sortie de Revengeance, toujours chez Napalm Records, puis c'est Existential Void Guardian qui voit le jour deux ans plus tard avec l'arrivée d'un nouveau batteur, Johnny King (également membre de Malthusian).","https://www.metalorgie.com//grp_tof/Conan.jpg"),
  ("Slayer",1981,"Slayer est un groupe de thrash metal américain, originaire de Huntington Park, en Californie. Le groupe est formé en 1981 par les guitaristes Jeff Hanneman et Kerry King3. Slayer est connu pour être l'un des groupes leaders du mouvement thrash metal, avec la sortie en 1986 de Reign in Blood, nommé « le meilleur album heavy de tous les temps avec Master of Puppets de Metallica » par Kerrang4. Le groupe est considéré comme l'un des « Big Four » des groupes de thrash metal, avec Megadeth, Anthrax et Metallica5. Le 22 janvier 2018, les membres annoncent la fin du groupe avec une tournée d'adieu prévue.","https://www.metalorgie.com//grp_tof/Slayer.jpg"),
  ("Metallica",1981,"Metallica est un groupe de heavy metal américain originaire de Californie. Formé à Los Angeles en 1981, le groupe est composé actuellement de deux de ses membres fondateurs, James Hetfield (chant, guitare rythmique) et Lars Ulrich (batterie), ainsi que du guitariste Kirk Hammett (arrivé en 1983) et du bassiste Robert Trujillo, qui rejoindra le groupe en 2003. Les précédents membres du groupe incluent Dave Mustaine (après son exclusion, membre fondateur de Megadeth), les bassistes Ron McGovney (uniquement pour les démos), Cliff Burton (pour les trois premiers albums ; décédé en 1986) et Jason Newsted (prenant la suite de Burton et remplacé en 2003 par Trujillo)","https://www.metalorgie.com//grp_tof/Metallica.jpg"),
  ("At the gates",1990,"At the Gates est un groupe de death metal mélodique suédois, originaire de Göteborg. Formé en 1990, le groupe est connu comme l'un des piliers de cette mouvance musicale3. À l'origine actif entre 1990 et 1996, le groupe se reforme en 2007 pour une tournée avant de se séparer de nouveau en 2008. Cependant, ils se réunissent de nouveau en décembre 2010, et continuent à se produire sur scène. A la fin de l'année 20144, le groupe publie At War with Reality, 19 ans après la sortie de son précédent album, puis, en 2018, To Drink from the Night Itself.","https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/At_the_Gates_Sweden_Rock_2008.jpg/1200px-At_the_Gates_Sweden_Rock_2008.jpg");

INSERT INTO musicians(firstName, lastName, instrument) VALUES
  ('Troy', 'Sanders', 'bass'),
  ('Brend', 'Hinds','guitar'),
  ('Bill', 'Kelliher','guitar'),
  ('Brann', 'Dailor','drum'),
  ('Daniel','Droste','guitar'),
  ('Christian', 'Hector','guitar'),
  ('Cornulius','Althammer','drum'),
  ('Stephan', 'Wandernorth','bass'),
  ('Richie','Grundy','drum'),
  ('Jon','Davis','guitar'),
  ('John','McNutty','bass'),
  ('Tom','Araya','bass'),
  ('Kerry','King','guitar'),
  ('Gary','Holt','guitar'),
  ('Dave','Lombardo','drum'),
  ('James','Hetfield','guitar'),
  ('Kirk','Hammett','guitar'),
  ('Robert','Trujillo','bass'),
  ('Lars','Ulrich','drum'),
  ('Tomas','Lindberg','mic'),
  ('Jonas','Stalhammar','guitar'),
  ('Adrian','Erlandsson','drum'),
  ('Jonas','Björler','bass'),
  ('Martin','Larsson','guitar');

INSERT INTO genres(name, description) VALUES
  ("Sludge", "Le sludge metal, ou simplement sludge, est un sous-genre de metal essentiellement apparu autour de la Nouvelle-Orléans1 au milieu des années 1980. Le genre mêle des éléments de doom metal et punk hardcore, et parfois de grunge1 et de noise rock. Les groupes de sludge metal se lancent initialement dans une musique lente et pessimiste, généralement caractérisée par des rythmes lourds et une atmosphère sombre, une instrumentation simplifiée, et des paroles souvent chargées de messages nihilistes"),
  ("Doom","Le doom metal est un genre musical fortement influencé par les premières chansons de Black Sabbath1, ce dernier ayant lancé les prémices du doom metal avec des chansons telles que Black Sabbath, Electric Funeral et Into the Void au cours de la première moitié des années 19701, et un certain nombre de groupes apparus en Angleterre (Pagan Altar, Witchfinder General), aux États-Unis (Pentagram, Saint Vitus, Trouble) et en Suède (Candlemass, Count Raven) ont aidé à définir le doom metal."),
  ("Thrash","Le thrash metal est un style de metal apparu au début des années 1980. Issu du heavy metal et du punk1, il se développe surtout aux États-Unis, en Allemagne et au Royaume-Uni. Les groupes Megadeth, Metallica, Slayer, et Anthrax sont reconnus par le grand public et la presse spécialisée comme les leaders du genre2, constituant à eux quatre ce que les fans et la presse spécialisée ont communément appelé le Big Four of Thrash."),
  ("Heavy","Le heavy metal (ou simplement metal), parfois retranscrit heavy métal en français, est un genre musical dérivé du rock3 apparu au Royaume-Uni et aux États-Unis à la fin des années 1960. Cependant, le terme de « heavy metal » est sujet à confusion car il peut prendre plusieurs sens différents selon le contexte dans lequel il est employé. Dans son contexte d'origine, il était indifféremment utilisé comme un synonyme de hard rock"),
  ("Death","Le death metal est un sous-genre musical extrême du heavy metal. Il emploie généralement des guitares très distordues, des tremolo picking, des growling profonds, des blast beats, les gammes mineures et des structures complexes avec de multiples changements de tempo."),
  ("Stoner","Le stoner rock, desert rock ou encore stoner metal1, est un sous-genre du rock et du metal se caractérisant par des rythmiques hypnotiques, simples et répétitives, une basse très lourde2, un chant mélodique, et une production « rétro »3. Il combine des éléments de doom metal, rock psychédélique, blues rock, acid rock et heavy metal4,5. Le stoner émerge et devient très populaire au cours des années 1990 avec les groupes Kyuss6 et Sleep"),
  ("Rock","Le rock est un genre musical apparu dans les années 1950 aux États-Unis et qui s'est développé en différents sous-genres à partir des années 1960, notamment aux États-Unis et au Royaume-Uni1. Il prend ses racines dans le rock 'n' roll des années 1940 et 1950, lui-même grandement influencé par le rhythm and blues et la country. Le rock a également incorporé des éléments provenant d'autres genres dont la folk, le blues, le jazz et la musique classique.");

INSERT INTO albums( name, idBand, releaseYear, image ) VALUES
  ("Once More Round The Sun", 1, 2014, "https://images-na.ssl-images-amazon.com/images/I/91-zD52giyL._SL1425_.jpg"),
  ("Blood Mountain",1,2006,"https://images-na.ssl-images-amazon.com/images/I/81usOCTGhcL._SL1425_.jpg"),
  ("The Divinity Of Oceans", 2, 2009, "https://upload.wikimedia.org/wikipedia/en/1/1e/Ahab-the-divinity-of-oceans.jpg"),
  ("The Boats Of The Glen Carrig",2,2015,"https://images-na.ssl-images-amazon.com/images/I/91KoTY0ciNL._SL1500_.jpg"),
  ("Monnos", 3, 2012, "https://images-na.ssl-images-amazon.com/images/I/81KKv3csZbL._SY355_.jpg"),
  ("Revengeance", 3, 2016, "https://f4.bcbits.com/img/a3169877932_10.jpg"),
  ("South Of Heaven",4,1988,"http://auxportesdumetal.com/reviews/Slayer/slayer-southofheaven170.jpg"),
  ("Reign In Blood",4,1986,"https://images-na.ssl-images-amazon.com/images/I/811zLZY7R0L._SL1417_.jpg"),
  ("...And Justice for All",5,1988,"https://img.discogs.com/vloL5f2_ibJ2nMc3w6BKFSnnkfk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-371162-1531515576-1093.jpeg.jpg"),
  ("Master Of Puppets",5,1986,"https://fr.shopping.rakuten.com/photo/1249963391.jpg"),
  ("Slaughter Of The Soul",6,1995,"https://www.nuclearblast.de/static/articles/276/276045.jpg/1000x1000.jpg"),
  ("At War With Reality",6,2014,"https://images-na.ssl-images-amazon.com/images/I/71oBaGiWjgL._SL1500_.jpg");

INSERT INTO isInBand(idMusician, idBand) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,2),
(6,2),
(7,2),
(8,2),
(9,3),
(10,3),
(11,3),
(12,4),
(13,4),
(14,4),
(15,4),
(16,5),
(17,5),
(18,5),
(19,5),
(20,6),
(21,6),
(22,6),
(23,6),
(24,6);

INSERT INTO albumHasGenre(idAlbum,idGenre) VALUES
(1,1),
(1,6),
(1,7),
(2,1),
(2,6),
(3,2),
(4,2),
(5,2),
(6,2),
(5,1),
(6,1),
(7,3),
(8,3),
(9,3),
(10,3),
(9,4),
(10,4),
(11,5),
(12,5);



/*



CREATE TABLE IF NOT EXISTS hasFavoriteBand(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idBand` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS hasFavoriteAlbum(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idAlbum` INT NOT NULL,
  PRIMARY KEY (`id`));

SELECT a.name, g.name 
  FROM albumHasGenre j 
    INNER JOIN genres g ON j.idGenre = g.id 
      INNER JOIN albums a ON j.idAlbum=a.id 
      ORDER BY a.name;

SELECT  b.name, m.firstName, m.lastName
  FROM isInBand j 
    INNER JOIN bands b ON j.idBand= b.id 
      INNER JOIN musicians m ON j.idMusician = m.id 
        ORDER BY b.name;

*/