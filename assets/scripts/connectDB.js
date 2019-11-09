const mysql = require('mysql');

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
