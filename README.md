# U-Develop-It
Module 12

## Definitions/Tools
Initial sign in using Bash: 

```bash
mysql -u root -p
```

CREATE - creates a new database.
    Ex: CREATE DATABASE <db-name>;
        USE <db-name>;

DELETE - deletes data from database.
    EX: DELETE FROM <table-name>;

DROP - deletes the database with no remorse.
    Ex: DROP DATABASE <db-name>;

INSERT - creates a new data entry.

SELECT - used to read a table.
    Ex: SELECT * FROM <table-name>;

SHOW - displays existing databases, tables.
    Ex: SHOW DATABASES;
        SHOW TABLES;

UPDATE - updates a data row. 
    Ex: UPDATE <db-name>
        SET <column-value> = <new-value>
        WHERE <table-column(id)> = <location-value(3)>;

USE - switches to specified database.
    Ex: USE <db-name>;

## Troubleshooting
- If you get an error stating that the database or table does not exist, you can start over and create the database again by running the following command:

    source db/db.sql

- This will execute the SQL commands in the db.sql file to drop the election database and create it again.
- To check that the election database was created, type the following command:

    SHOW DATABASES;

- Next, create the table for candidates by running the following command:

    source db/schema.sql

- Now, to check that the candidates table was created correctly, type the following command:

    SHOW TABLES;

- Finally, seed the candidates table by running the following command:

    source db/seeds.sql

- Now let's check whether the database is correctly seeded and ready to go! Type the following SQL query again:

    SELECT * FROM candidates;