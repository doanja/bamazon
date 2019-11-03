const inquirer = require('inquirer');
const mysql = require('mysql');

const promptInput = () => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      { type: 'input', message: 'Enter product ID you wish to buy?', name: 'item_id' },
      { type: 'input', message: 'Enter quanity you wish to buy?', name: 'quantity' }
    ])
    .then(res => {
      console.log('res.item_id :', res.item_id);
      console.log('res.quantity :', res.quantity);
      updateProduct(con, res.item_id, res.quantity);
    });
};

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

const readProducts = con => {
  con.query(
    `SELECT item_id AS 'Item ID', product_name AS 'Product', price AS 'Price per Item', stock_quantity AS 'Stock Quantity' FROM products`,
    function(err, res, fields) {
      if (err) throw err;
      console.log(res);
      promptInput();
    }
  );
};

const updateProduct = (con, item_id, quantity) => {
  con.query(`UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE item_id=${item_id}`, function(err, res, fields) {
    if (err) throw err;
    getOrderTotal(con, item_id, quantity);
  });
};

const getOrderTotal = (con, item_id, quantity) => {
  con.query(
    `SELECT product_name as 'Product', price as 'Price per Item', price * ${quantity} AS 'Total' FROM products WHERE item_id = ${item_id}`,
    function(err, res, fields) {
      if (err) throw err;
      console.log('Order Summary:', res);
    }
  );
};

const con = initDBConnection();
readProducts(con);
