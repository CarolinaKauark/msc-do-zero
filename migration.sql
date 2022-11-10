DROP DATABASE IF EXISTS register_db;

CREATE DATABASE register_db;

USE register_db;

CREATE TABLE person (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(45) NOT NULL,
  birth_date DATETIME NOT NULL,
  cpf varchar(30) NOT NULL UNIQUE,
  PRIMARY KEY(id)
) ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;