const inquirer = require('inquirer');
const initDBConnection = require('./connectDB');

/**
 * function to prompt user for input
 * @param {object} con the connection string
 */
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

/**
 * function to prompt user for input
 * @param {object} con the connection string
 */
const promptInputAgain = con => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'list',
        message: 'Do you want to order something else?',
        choices: ['Yes', 'No'],
        name: 'answer'
      }
    ])
    .then(res => {
      if (res.answer === 'Yes') {
        readProducts(con);
      } else {
        con.end();
      }
    });
};

/**
 * function to call SELECT from the database and prints it to the console
 * @param {object} con the connection string
 */
const readProducts = con => {
  con.query(`SELECT item_id, product_name, price, stock_quantity FROM products `, function(
    err,
    res,
    fields
  ) {
    if (err) throw err;
    console.log('ID \t Price \t Quantity \t Product');
    console.log('---------------------------------------------');
    res.forEach(product => {
      console.log(
        `${product.item_id} \t ${product.price} \t ${product.stock_quantity} \t\t ${product.product_name} `
      );
    });
    promptInput(con);
  });
};

/**
 * function to check to see if there is enough stock in the database
 * @param {object} con the connection string
 * @param {number} item_id the ID of the item in the database
 * @param {number} reqQuantity the requested quantity
 */
const checkStockQuantity = (con, item_id, reqQuantity) => {
  con.query(`SELECT stock_quantity FROM products WHERE item_id = ${item_id}`, function(
    err,
    res,
    fields
  ) {
    if (err) throw err;
    if (parseInt(res[0].stock_quantity) < reqQuantity) {
      console.log(`There is not enough quantity in stock to fulfill your order...`);
      promptInputAgain(con);
    } else {
      updateProduct(con, item_id, reqQuantity);
    }
  });
};

/**
 * function to update the quantity of the item in the database
 * @param {object} con the connection string
 * @param {number} item_id the ID of the item in the database
 * @param {number} quantity the quantity of the item in the database
 */
const updateProduct = (con, item_id, quantity) => {
  con.query(
    `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE item_id=${item_id}`,
    function(err, res, fields) {
      if (err) throw err;
      getOrderTotal(con, item_id, quantity);
    }
  );
};

/**
 * function to calculate the order total and prints it to the console
 * @param {object} con the connection string
 * @param {number} item_id the ID of the item in the database
 * @param {number} quantity the quantity of the item in the database
 */
const getOrderTotal = (con, item_id, quantity) => {
  con.query(
    `SELECT product_name as 'Product', price as 'Price per Item', price * ${quantity} AS 'Total' FROM products WHERE item_id = ${item_id}`,
    function(err, res, fields) {
      if (err) throw err;
      console.log('Order Summary:', res);
      updateProductSales(con, item_id, quantity);
      promptInputAgain(con);
    }
  );
};

/**
 * function to update the product sales column
 * @param {object} con the connection string
 * @param {number} item_id the ID of the item in the database
 * @param {number} quantity the quantity of the item in the database
 */
const updateProductSales = (con, item_id, quantity) => {
  con.query(
    `UPDATE products SET product_sales = product_sales + (price * ${quantity}) WHERE item_id=${item_id}`,
    function(err, res, fields) {
      if (err) throw err;
      return;
    }
  );
};

const con = initDBConnection();
readProducts(con);
