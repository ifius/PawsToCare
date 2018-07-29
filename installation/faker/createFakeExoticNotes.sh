#!/bin/bash

node notesFaker.js > fakeExoticNoteData.csv

sudo cp fakeExoticNoteData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeExoticNoteData.csv' 
INTO TABLE pawsToCare.exoticNotes
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(exoticsFk, vetName, date, note)
SET id = NULL;
EOF
