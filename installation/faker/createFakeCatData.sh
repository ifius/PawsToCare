#!/bin/bash

node catFaker.js > fakeCatData.csv

sudo cp fakeCatData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeCatData.csv' 
INTO TABLE pawsToCare.cats
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(name, breed, sex, shots, declawed, neutered, birthdate)
SET id = NULL;
EOF
