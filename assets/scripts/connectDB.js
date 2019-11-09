const mysql = require('mysql');

/**
 * function to establish connection with the SQL database
 */
const initDBConnection = () => {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'bamazon'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
  });

  return con;
};

module.exports = initDBConnection;
