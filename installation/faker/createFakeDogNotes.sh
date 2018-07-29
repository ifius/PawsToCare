#!/bin/bash

node notesFaker.js > fakeDogNoteData.csv

sudo cp fakeDogNoteData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeDogNoteData.csv' 
INTO TABLE pawsToCare.dogNotes
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(dogsFk, vetName, date, note)
SET id = NULL;
EOF
