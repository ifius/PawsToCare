CREATE TABLE cats(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  breed VARCHAR(64),
  sex CHAR,
  shots BOOLEAN,
  declawed BOOLEAN,
  neutered BOOLEAN,
  birthdate DATE
);
CREATE TABLE dogs(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  breed VARCHAR(64),
  sex CHAR,
  shots BOOLEAN,
  licensed BOOLEAN,
  neutered BOOLEAN,
  birthdate DATE,
  weight int unsigned
);
CREATE TABLE exotics(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  species VARCHAR(64),
  sex CHAR,
  neutered BOOLEAN,
  birthdate DATE
);
CREATE TABLE catNotes(
  id INT PRIMARY KEY AUTO_INCREMENT,
  catsFk int,
  vetName VARCHAR(64),
  date TIMESTAMP,
  note text
);
CREATE TABLE dogNotes(
  id INT PRIMARY KEY AUTO_INCREMENT,
  dogsFk int,
  vetName VARCHAR(64),
  date TIMESTAMP,
  note text
);
CREATE TABLE exoticNotes(
  id INT PRIMARY KEY AUTO_INCREMENT,
  exoticsFk int,
  vetName VARCHAR(64),
  date TIMESTAMP,
  note text
);
CREATE TABLE ownerNotes(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ownersFk int,
  vetName VARCHAR(64),
  date TIMESTAMP,
  note text
);
CREATE TABLE owners(
  id INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(64),
  lname VARCHAR(64),
  add1 VARCHAR(64),
  add2 VARCHAR(64),
  city VARCHAR(64),
  st CHAR(2),
  zip CHAR(5)
);
CREATE TABLE catsOwners(
  id INT PRIMARY KEY AUTO_INCREMENT,
  catsFk int,
  ownersFk int
);
CREATE TABLE dogsOwners(
  id INT PRIMARY KEY AUTO_INCREMENT,
  dogsFk int,
  ownersFk int
);
CREATE TABLE exoticsOwners(
  id INT PRIMARY KEY AUTO_INCREMENT,
  exoticsFk int,
  ownersFk int
);
  
