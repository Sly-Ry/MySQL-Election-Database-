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

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// Delete a candidate
// ? - placeholder, making this a prepared statement. 
// A prepared statement - executes the same SQL statements repeatedly using different values in place of the placeholder.
// One reason to use a placeholder in the SQL query is to block a SQL injection attack, which replaces the client user variable and inserts alternate commands that could reveal or destroy the database.

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, results) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(results);
// });

// Create a candidate
// The SQL command and the SQL parameters were assigned to the sql and params variables respectively to improve the legibility for the call function to the database.
// INSERT INTO - adds the values that are assigned to param.
// VALUES (?,?,?,?) - because the candidates table includes four columns [id, first_name, last_name, industry_connected] we need four placeholders for those four values. 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`
;

// The four placeholders must match the four values in params, so we must use an array.
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, results) =>{
    if(err) {
        console.log(err);
    }
    console.log(results)
})

// Default response for any other request (Not Found). [catchall route]
app.use((req, res) => {
    res.status(404).end();
});

// The function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

