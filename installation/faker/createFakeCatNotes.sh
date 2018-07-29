#!/bin/bash

node notesFaker.js > fakeCatNoteData.csv

sudo cp fakeCatNoteData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeCatNoteData.csv' 
INTO TABLE pawsToCare.catNotes
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(catsFk, vetName, date, note)
SET id = NULL;
EOF
