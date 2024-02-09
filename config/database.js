const { createConnection } = require('mysql');

const pool = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.MYSQL_PORT,
    multipleStatements: true
});

pool.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected Sucessfully!");
});

module.exports = pool;
