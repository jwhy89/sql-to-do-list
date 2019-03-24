const pg = require('pg');

// Setup pg to talk to our songs database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // YOU WILL CHANGE THES FOR EACH APP
    host: 'localhost',
    port: 5432,
    max: 10, // max connections in pool
    idleTimeoutMillis: 30000 // 30 sec before timeout on query
})

// These pool.on's are not required for things to work,
// but are great for debugging
pool.on('connect', () => {
    console.log('Postgres connected! Woot!');
})

pool.on('error', (error) => {
    console.log('Database error ');
})

// Export our router to be used in the server.js
module.exports = pool;