#!/bin/bash

node notesFaker.js > fakeOwnerNoteData.csv

sudo cp fakeOwnerNoteData.csv /var/lib/mysql/pawsToCare/

mysql -u webuser -p$(cat webuser.password) pawsToCare <<EOF 
LOAD DATA INFILE '/var/lib/mysql/pawsToCare/fakeOwnerNoteData.csv' 
INTO TABLE pawsToCare.ownerNotes
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(ownersFk, vetName, date, note)
SET id = NULL;
EOF
