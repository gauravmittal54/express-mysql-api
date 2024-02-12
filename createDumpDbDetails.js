const mysql = require('mysql');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
});

const sqlScriptPath = `${__dirname}\\dumpDbDetails.sql`;
console.log(sqlScriptPath);

const executeSQLScript = () => {
  const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }

    connection.query(sqlScript, (err, results, fields) => {
      if (err) {
        console.error('Error executing SQL script:', err);
      } else {
        console.log('SQL script executed successfully!');
      }

      connection.end();
    });
  });
};

executeSQLScript();
