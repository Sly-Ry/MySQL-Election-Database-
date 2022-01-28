# U-Develop-It
Module 12

## Definitions/Tools
Initial sign in using Bash: 

```bash
mysql -u root -p
```
ALTER TABLE - allows you to add a new field, delete an existing field, or modify a field.
    Ex: ALTER TABLE <table1-name(candidates)> ADD COLUMN <new-column-name(party_id)> INTEGER;

AS - lets you define an alias for your data, which is particularly useful when joining tables that might have overlapping field names.
    Ex: SELECT <db-name(candidates)>.*, <table2>.<table1-colomn-name)> AS <new-column-name(party_name)>

CREATE - creates a new database.
    Ex: CREATE DATABASE <db-name>;
        USE <db-name>;

CONSTRAINT - allows us to flag additional tables as an official foreign key(fk) and tells SQL which table and field it references ensuring that no id can be inserted into the original table if it doesn't also exist in the additional table in which case MySQL will return an error for any operation that would violate a constraint.
    Ex: CONSTRAINT fk_<table2(party)> FOREIGN KEY <table1-column-value(party_id)> REFERENCES <table2-column-value(party_id)> ON DELETE SET NULL

CURRENT_TIMESTAMP -  this will return the current date and time in the same 2020-01-01 13:00:00 format. Note that the time will be based on what time it is according to your server, not the client's machine.

DATETIME - [will look something like 2020-01-01 13:00:00] The front-end team can take that value, convert it with JavaScript's Date() constructor and display anything they want.
    Ex: created_at DATETIME DEFAULT CURRENT_TIMESTAMP

DEFAULT - if you don't specify NOT NULL, then a field could potentially be NULL if that value isn't provided in an INSERT statement. With DEFAULT, however, you can specify what the value should be if no value is provided.

DELETE - deletes data from database.
    EX: DELETE FROM <table-name>;

DESC - sorts data in descending order (i.e., starting at Z instead of A).
    Ex: ORDER BY <column-value(last_name)> DESC

DROP - deletes the database or table with no remorse.
    Ex: [a] DROP DATABASE <db-name>;
        [b] DROP TABLE IF EXISTS <db-name>;

FOREIGN KEY - a field in one table that references the primary key of another table.
    Ex: CONSTRAINT fk_<table2-name(party)> FOREIGN KEY <table1-column-value(party_id)> REFERENCES <table2(parties)><table2-column-name(id)> ON DELETE SET NULL

INSERT - creates a new data entry.
    Ex: INSERT INTO <table-name> (<column-value(name)>)
        VALUES
            ('<value(ryan)>');

JOIN - joins tables throught ids
    Ex: SELECT * FROM <items>
        LEFT JOIN <categories> ON <items.category_id> = <categories.id>;

ON DELETE SET NULL - sets a table's <column-value> to NULL if the corresponding row is ever deleted.
    Ex: CONSTRAINT fk_<table2-name(party)> FOREIGN KEY <table1-column-value(party_id)> REFERENCES <table2-column-value(party_id)> ON DELETE SET NULL

ORDER - rows can be sorted on retrieval.

SELECT - used to read a table.
    Ex: SELECT * FROM <table-name>;

SHOW - displays existing databases, tables.
    Ex: SHOW DATABASES;
        SHOW TABLES;

TEXT - can store strings of varying length.
    Ex: <column-value> TEXT;

UPDATE - updates a data row. 
    Ex: UPDATE <db-name>
        SET <column-value> = <new-value>
        WHERE <table-column(id)> = <location-value(3)>;

USE - switches to specified database.
    Ex: USE <db-name>;

VARCHAR -  must declare a limit on the length.
    Ex: <column-value> VARCHAR(#) NOT NULL;
    
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