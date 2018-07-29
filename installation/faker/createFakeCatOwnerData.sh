#!/bin/bash

node animalOwnerFaker.js > catOwnersData.csv

sudo cp catOwnersData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/catOwnersData.csv' 
INTO TABLE pawsToCare.catsOwners
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(catsFk, ownersFk)
SET id = NULL;
EOF
