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
  ('ZoeMet4l62', 'lafofollehihihi@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Zo??', 'Harty', 1626763072704),
  ('Occurence', 'ginettewoismoulle@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$SpPR2laAv9hXNSmctgZM9Q$xjwXSVEIW1utwt9Iki0DP4IJ34pmk16CutgG5yCRlwg', 0,'Ginette', 'Woismoulle', 1626763072704);

INSERT INTO bands(name, formationYear, description, image) VALUES
  ("Mastodon", 1999, "Mastodon est un groupe de sludge metal am??ricain, originaire d'Atlanta, en G??orgie. Le groupe se compose du bassiste et chanteur Troy Sanders, du guitariste et chanteur Brent Hinds, du guitariste Bill Kelliher, et du batteur et chanteur Brann Dailor. Le groupe est reconnu pour son m??lange unique de rock et metal aux sonorit??s sludge, progressives et heavy, ?? haute teneur en passages psych??d??liques.", "https://www.metalorgie.com/grp_tof/448-photo_Mastodon.jpg"),
  ("Ahab",2004,"Ahab est un groupe de funeral doom metal allemand, originaire de Heidelberg et Bade-Wurtemberg. Il est form?? en 2004 par les deux guitaristes du groupe Midnattsol. Le nom du groupe provient du nom du capitaine dans le livre de Herman Melville, Moby Dick. Sa musique et ses paroles sont ??galement inspir??es par la th??matique du livre (de la litt??rature et de l'oc??an).","https://www.metalorgie.com//grp_tof/Ahab.jpg"),
  ("Conan",2006,"Liverpool 2006, Richie Grundy (Batterie) et Jon Davis (Guitare / Chant) fondent Conan, au d??part un duo Stoner / Doom / Sludge. Rejoints par John McNulty (Basse / Chant), ils enregistrent un ep Battle In The Swamp en 2007. Apr??s des difficult??s de line-up, ce n'est qu'en 2010 que le groupe se stabilise avec l'arriv??e de Paul O'Neill ?? la batterie et Conan enregistre une d??mo ainsi que l'ep Horseback Battle Hammer chez Aurora Borealis Records et Throne Records. John quitte le groupe en 2011, remplac?? par Dave Perry avec qui ils sortent uniquement un split avec Slomatics la m??me ann??e. Phil Coumbe rejoint les rangs fin 2011. En 2012, leur premier album Monnos parait chez Burning World Records et qui voit na??tre les r??f??rences ?? Sunn O))), Sleep et Yob. Le groupe est pr??sent au Roadburn 2012 dont la captation sort en 2013 sur le label du festival. Un split avec Bongripper voit le jour la m??me ann??e. En 2014 Conan sort un second effort, Blood Eagle, chez Napalm Records et se produit une seconde fois au Roadburn. Chris Fielding prend le poste de bassiste dans le groupe ?? cette ??poque tandis que le groupe se voit jouer sur la sc??ne du Maryland Deathfest et du Psycho California. 2016 marque la sortie de Revengeance, toujours chez Napalm Records, puis c'est Existential Void Guardian qui voit le jour deux ans plus tard avec l'arriv??e d'un nouveau batteur, Johnny King (??galement membre de Malthusian).","https://www.metalorgie.com//grp_tof/Conan.jpg"),
  ("Slayer",1981,"Slayer est un groupe de thrash metal am??ricain, originaire de Huntington Park, en Californie. Le groupe est form?? en 1981 par les guitaristes Jeff Hanneman et Kerry King3. Slayer est connu pour ??tre l'un des groupes leaders du mouvement thrash metal, avec la sortie en 1986 de Reign in Blood, nomm?? ?? le meilleur album heavy de tous les temps avec Master of Puppets de Metallica ?? par Kerrang4. Le groupe est consid??r?? comme l'un des ?? Big Four ?? des groupes de thrash metal, avec Megadeth, Anthrax et Metallica5. Le 22 janvier 2018, les membres annoncent la fin du groupe avec une tourn??e d'adieu pr??vue.","https://www.metalorgie.com//grp_tof/Slayer.jpg"),
  ("Metallica",1981,"Metallica est un groupe de heavy metal am??ricain originaire de Californie. Form?? ?? Los Angeles en 1981, le groupe est compos?? actuellement de deux de ses membres fondateurs, James Hetfield (chant, guitare rythmique) et Lars Ulrich (batterie), ainsi que du guitariste Kirk Hammett (arriv?? en 1983) et du bassiste Robert Trujillo, qui rejoindra le groupe en 2003. Les pr??c??dents membres du groupe incluent Dave Mustaine (apr??s son exclusion, membre fondateur de Megadeth), les bassistes Ron McGovney (uniquement pour les d??mos), Cliff Burton (pour les trois premiers albums ; d??c??d?? en 1986) et Jason Newsted (prenant la suite de Burton et remplac?? en 2003 par Trujillo)","https://www.metalorgie.com//grp_tof/Metallica.jpg"),
  ("At the gates",1990,"At the Gates est un groupe de death metal m??lodique su??dois, originaire de G??teborg. Form?? en 1990, le groupe est connu comme l'un des piliers de cette mouvance musicale3. ?? l'origine actif entre 1990 et 1996, le groupe se reforme en 2007 pour une tourn??e avant de se s??parer de nouveau en 2008. Cependant, ils se r??unissent de nouveau en d??cembre 2010, et continuent ?? se produire sur sc??ne. A la fin de l'ann??e 20144, le groupe publie At War with Reality, 19 ans apr??s la sortie de son pr??c??dent album, puis, en 2018, To Drink from the Night Itself.","https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/At_the_Gates_Sweden_Rock_2008.jpg/1200px-At_the_Gates_Sweden_Rock_2008.jpg");

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
  ('Jonas','Bj??rler','bass'),
  ('Martin','Larsson','guitar');

INSERT INTO genres(name, description) VALUES
  ("Sludge", "Le sludge metal, ou simplement sludge, est un sous-genre de metal essentiellement apparu autour de la Nouvelle-Orl??ans1 au milieu des ann??es 1980. Le genre m??le des ??l??ments de doom metal et punk hardcore, et parfois de grunge1 et de noise rock. Les groupes de sludge metal se lancent initialement dans une musique lente et pessimiste, g??n??ralement caract??ris??e par des rythmes lourds et une atmosph??re sombre, une instrumentation simplifi??e, et des paroles souvent charg??es de messages nihilistes"),
  ("Doom","Le doom metal est un genre musical fortement influenc?? par les premi??res chansons de Black Sabbath1, ce dernier ayant lanc?? les pr??mices du doom metal avec des chansons telles que Black Sabbath, Electric Funeral et Into the Void au cours de la premi??re moiti?? des ann??es 19701, et un certain nombre de groupes apparus en Angleterre (Pagan Altar, Witchfinder General), aux ??tats-Unis (Pentagram, Saint Vitus, Trouble) et en Su??de (Candlemass, Count Raven) ont aid?? ?? d??finir le doom metal."),
  ("Thrash","Le thrash metal est un style de metal apparu au d??but des ann??es 1980. Issu du heavy metal et du punk1, il se d??veloppe surtout aux ??tats-Unis, en Allemagne et au Royaume-Uni. Les groupes Megadeth, Metallica, Slayer, et Anthrax sont reconnus par le grand public et la presse sp??cialis??e comme les leaders du genre2, constituant ?? eux quatre ce que les fans et la presse sp??cialis??e ont commun??ment appel?? le Big Four of Thrash."),
  ("Heavy","Le heavy metal (ou simplement metal), parfois retranscrit heavy m??tal en fran??ais, est un genre musical d??riv?? du rock3 apparu au Royaume-Uni et aux ??tats-Unis ?? la fin des ann??es 1960. Cependant, le terme de ?? heavy metal ?? est sujet ?? confusion car il peut prendre plusieurs sens diff??rents selon le contexte dans lequel il est employ??. Dans son contexte d'origine, il ??tait indiff??remment utilis?? comme un synonyme de hard rock"),
  ("Death","Le death metal est un sous-genre musical extr??me du heavy metal. Il emploie g??n??ralement des guitares tr??s distordues, des tremolo picking, des growling profonds, des blast beats, les gammes mineures et des structures complexes avec de multiples changements de tempo."),
  ("Stoner","Le stoner rock, desert rock ou encore stoner metal1, est un sous-genre du rock et du metal se caract??risant par des rythmiques hypnotiques, simples et r??p??titives, une basse tr??s lourde2, un chant m??lodique, et une production ?? r??tro ??3. Il combine des ??l??ments de doom metal, rock psych??d??lique, blues rock, acid rock et heavy metal4,5. Le stoner ??merge et devient tr??s populaire au cours des ann??es 1990 avec les groupes Kyuss6 et Sleep"),
  ("Rock","Le rock est un genre musical apparu dans les ann??es 1950 aux ??tats-Unis et qui s'est d??velopp?? en diff??rents sous-genres ?? partir des ann??es 1960, notamment aux ??tats-Unis et au Royaume-Uni1. Il prend ses racines dans le rock 'n' roll des ann??es 1940 et 1950, lui-m??me grandement influenc?? par le rhythm and blues et la country. Le rock a ??galement incorpor?? des ??l??ments provenant d'autres genres dont la folk, le blues, le jazz et la musique classique.");

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