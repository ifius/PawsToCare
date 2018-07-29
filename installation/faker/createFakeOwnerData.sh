#!/bin/bash

node ownersFaker.js > fakeOwnerData.csv

sudo cp fakeOwnerData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeOwnerData.csv' 
INTO TABLE pawsToCare.owners
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(fname, lname, add1, add2, city, st, zip)
SET id = NULL;
EOF
