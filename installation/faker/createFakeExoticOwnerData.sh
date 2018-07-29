#!/bin/bash

node animalOwnerFaker.js > exoticOwnersData.csv

sudo cp exoticOwnersData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/exoticOwnersData.csv' 
INTO TABLE pawsToCare.exoticsOwners
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(exoticsFk, ownersFk)
SET id = NULL;
EOF
