# Paws To Care

Website project for Web II, Utah Valley University, Summer 2018

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system

### Prerequisites

Your web host must already have Apache (2.4.34), MySQL (8.0.11)/MariaDB (15.1), and PHP(7.2.8, with JSON support) installed

### Installing

1. Run the script createDatabase.sh in the installation folder 
2. Copy the contents of the html folder to your Apache directory (typically /var/www/html/)
3. Verify login using the admin username and password supplied previously at http(s)://localhost/login.php

## Running the Tests

Jasmine tests are included and accessible from http(s)://localhost/jasmine once logged in as an admin user
Fake data can be imported into the database by running the script createAllFakeData.sh from the installation folder

### Jasmine Tests

The following items are tested:
1. Sorting
2. Filtering
3. Pagination 

## Version

2018-08-09
Final Release
=====================
* Unified navigation bar for all roles
* Pagination of all non-modal tables
* Owners page to view all pet owners (admin only)
* Pets page for an owner to view their pets (owners only)
* Login and logout functionality
* Role-enforced content security

2018-08-01
Milestone One Release
=====================
* MySQL database created
* Faker.js used to populate the database tables (cats, dogs, exotics, and owners) and associated notes with 1000 rows of data
* API endpoint created for cats, dogs, exotics, and owners
* Jasmine test page added with sorting and filtering tests

## Authors

* **John Barton** - [john@barton.link](mailto:john@barton.link) [LinkedIn](https://www.linkedin.com/in/john-barton-93380b7b/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* David Wagstaff [Professional Page](https://www.uvu.edu/profpages/profiles/show/user_id/20687)
