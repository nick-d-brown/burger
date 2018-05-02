### Initialize the database and it's structure

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR (100),
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);