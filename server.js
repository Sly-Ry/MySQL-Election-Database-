const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'eNderRoot1993',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// db.query() - runs the SQL query and executes the callback with all the resulting rows that match the query.Once this method executes the SQL command, the callback function captures the responses from the query in two variables.
// err - the error response.
// rows - the database query response.

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Default response for any other request (Not Found). [catchall route]
app.use((req, res) => {
    res.status(404).end();
});

// The function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

