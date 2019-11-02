const inquirer = require('inquirer');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

const promptInput = () => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      { type: 'input', message: 'What do you want to do with the database?', name: 'username' }
    ])
    .then(res => {
      // Use user feedback for... whatever!!
    });
};
