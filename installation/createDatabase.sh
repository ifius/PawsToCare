#!/bin/bash
echo "CREATING DATABASE"
mysql -u root -p < createDatabase.sql |
	grep -E "^[a-f|0-9]{8}-[a-f|0-9]{4}-[a-f|0-9]{4}-[a-f|0-9]{4}-[a-f|0-9]{12}" > webuser.password

echo "webuser created with password $(cat webuser.password)"
cp webuser.password Faker/
echo "<?php \$databasePassword = '$(cat webuser.password)'; ?>" | sudo tee /etc/webuser.password.php > /dev/null
sudo cp pawsToCare.config.php /etc/

echo "CREATING TABLES"
mysql -u webuser -p$(cat webuser.password) pawsToCare < ddl.sql


