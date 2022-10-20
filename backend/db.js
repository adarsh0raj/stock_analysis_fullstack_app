const Pool = require('pg').Pool;

// Change according to your database
const pool = new Pool({
    user: 'adarsh',
    host: 'localhost',
    database: 'zenskar',
    password: 'adarsh',
    port: 5432,
});

module.exports = pool;