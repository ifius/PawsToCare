#!/bin/bash

node exoticFaker.js > fakeExoticData.csv

sudo cp fakeExoticData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeExoticData.csv' 
INTO TABLE pawsToCare.exotics
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(name, species, sex, neutered, birthdate)
SET id = NULL;
EOF
