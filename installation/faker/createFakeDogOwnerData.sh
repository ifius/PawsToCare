#!/bin/bash

node animalOwnerFaker.js > dogOwnersData.csv

sudo cp dogOwnersData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/dogOwnersData.csv' 
INTO TABLE pawsToCare.dogsOwners
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(dogsFk, ownersFk)
SET id = NULL;
EOF
