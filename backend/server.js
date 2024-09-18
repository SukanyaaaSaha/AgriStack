
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const cors = require('cors'); 
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Enable CORS for all routes
// app.use(cors());

// app.use(bodyParser.json());

// // MySQL connection setup
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// app.post('/store-data', (req, res) => {
//     const data = req.body;
//     // Extract cred_id and remove it from the data object
//     const cred_id = data.id;
//     const cred_sub = JSON.stringify(data.credentialSubject);
//     const query = "INSERT INTO data_store (cred_id, json_data ) VALUES (?,?)";
//     db.query(query,
//          [cred_id, cred_sub], 
//         (err, result) => {
//         console.log("query", query);
//         if (err) {
//             console.error('Error storing data:', err);
//             res.status(500).send('Error storing data');
//             return;
//         }
//         res.status(200).send(`Data stored with ID: ${result.insertId}`);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/store-data', (req, res) => {
    const { cred_id, json_data } = req.body;

    // Check if required fields are present
    if (!cred_id || !json_data) {
        return res.status(400).send('Bad Request: Missing cred_id or json_data');
    }

    const query = "INSERT INTO data_store (cred_id, json_data) VALUES (?, ?)";
    db.query(query, [cred_id, json_data], (err, result) => {
        if (err) {
            console.error('Error storing data:', err);
            return res.status(500).send('Error storing data');
        }
        res.status(200).send(`Data stored with ID: ${result.insertId}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
