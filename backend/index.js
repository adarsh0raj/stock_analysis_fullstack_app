const express = require('express');
const app = express();
const pool = require('./db');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/Stocks', async(req, res) => {
    try {
        const stocks = await pool.query('SELECT * FROM Stocks');
        res.json(stocks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, (req, res) => {
    console.log('Node Server is running on port 3000');
});