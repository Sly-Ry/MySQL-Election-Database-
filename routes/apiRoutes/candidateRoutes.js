const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all candidates.
// The api in the URL signifies that this is an API endpoint.
router.get('/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;
    // db.query() - runs the SQL query and executes the callback with all the resulting rows that match the query.Once this method executes the SQL command, the callback function captures the responses from the query in two variables.
    // err - the error response.
    // rows - the database query response.
    db.query(sql, (err, rows) => {
        if (err) {
            // Instead of logging the error, we'll send a status code of 500 and place the error message within a JSON object. 
            res.status(500).json({ error: err.message });
            return;
        }
        // If there was no error, then err is null and the response is sent back using the following statement:
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
router.get('/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id 
                WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            // Instead of logging the error, we'll send a status code of 500 and place the error message within a JSON object. 
            res.status(400).json({ error: err.message });
            return;
        }
        // If there was no error, then err is null and the response is sent back using the following statement:
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create a candidate
router.post('/api/candidate', ({ body }, res) => {
    // inputCheck - verifies that user info in the request can create a candidate.
    // Object destructuring to pull the body property out of the request object
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');

    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    // The SQL command and the SQL parameters were assigned to the sql and params variables respectively to improve the legibility for the call function to the database.
    // INSERT INTO - adds the values that are assigned to param.
    // VALUES (?,?,?) - because the candidates table includes three columns [first_name, last_name, industry_connected] we need three placeholders for those three values. 
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)`
    ;
    // The three placeholders must match the three values in params, so we must use an array.
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
    });
});

// Delete a candidate
// ? - placeholder, making this a prepared statement. 
// A prepared statement - executes the same SQL statements repeatedly using different values in place of the placeholder.
// One reason to use a placeholder in the SQL query is to block a SQL injection attack, which replaces the client user variable and inserts alternate commands that could reveal or destroy the database.
router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: err.message });
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found.'
            });
        }
        else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });      
});

// Update a candidate's party
// The affected row's id should always be part of the route (e.g., /api/candidate/2) 
router.put('/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `UPDATE candidates SET party_id = ? 
        WHERE id = ?`
    ;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // Check if a record exists
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        }
        else {
            // The actual fields we're updating should be part of the body.
            res.json({
                message: 'Success.',
                data: req.body,
                changes: result.affectedRows
            });
        }
    })
});

module.exports = router;