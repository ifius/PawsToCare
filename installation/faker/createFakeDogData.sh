#!/bin/bash

node dogFaker.js > fakeDogData.csv

sudo cp fakeDogData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeDogData.csv' 
INTO TABLE pawsToCare.dogs
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(name, breed, sex, shots, licensed, neutered, birthdate, weight)
SET id = NULL;
EOF
