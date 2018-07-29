CREATE DATABASE pawsToCare;

CREATE TABLE pawsToCare.webuserPassword (password VARCHAR(36));

INSERT INTO pawsToCare.webuserPassword(password) 
SELECT uuid();

SELECT @webuserPassword := password FROM pawsToCare.webuserPassword;
SET @createUser = CONCAT('CREATE USER "webuser"@"localhost" IDENTIFIED BY "', @webuserPassword, '"');
PREPARE stmt FROM @createUser; 
EXECUTE stmt; 
DEALLOCATE PREPARE stmt;
GRANT ALL PRIVILEGES ON pawsToCare.* TO 'webuser'@'localhost';
GRANT FILE ON *.* TO 'webuser'@'localhost';
FLUSH PRIVILEGES;

SELECT CONCAT('webuser created with password: ', @webuserPassword); 




