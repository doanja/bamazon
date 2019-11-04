const inquirer = require('inquirer');
const initDBConnection = require('./connectDB');

const promptInput = con => {
  inquirer
    .prompt([
      { type: 'input', message: 'Enter product ID you wish to buy?', name: 'item_id' },
      { type: 'input', message: 'Enter quanity you wish to buy?', name: 'quantity' }
    ])
    .then(res => {
      // check stock
      checkStockQuantity(con, res.item_id, parseInt(res.quantity));
    });
};

const promptInputAgain = con => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      { type: 'list', message: 'Do you want to order something else?', choices: ['Yes', 'No'], name: 'answer' }
    ])
    .then(res => {
      if (res.answer === 'Yes') {
        readProducts(con);
      } else {
        con.end();
      }
    });
};

const readProducts = con => {
  con.query(`SELECT item_id, product_name, price, stock_quantity FROM products `, function(err, res, fields) {
    if (err) throw err;
    console.log('ID \t Price \t Quantity \t Product');
    console.log('---------------------------------------------');
    res.forEach(product => {
      console.log(`${product.item_id} \t ${product.price} \t ${product.stock_quantity} \t\t ${product.product_name} `);
    });
    promptInput(con);
  });
};

const checkStockQuantity = (con, item_id, reqQuantity) => {
  con.query(`SELECT stock_quantity FROM products WHERE item_id = ${item_id}`, function(err, res, fields) {
    if (err) throw err;
    if (parseInt(res[0].stock_quantity) < reqQuantity) {
      console.log(`There is not enough quantity in stock to fulfill your order...`);
      promptInputAgain(con);
    } else {
      updateProduct(con, item_id, reqQuantity);
    }
  });
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
      promptInputAgain(con);
    }
  );
};

const con = initDBConnection();
readProducts(con);
