// create connection to database mysql
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mangkat-api',
});

module.exports = connection;
