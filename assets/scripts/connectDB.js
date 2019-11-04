const mysql = require('mysql');

const initDBConnection = () => {
  var con = mysql.createConnection({
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
