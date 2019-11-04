const inquirer = require('inquirer');
const initDBConnection = require('./connectDB');

const promptInput = con => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What do you want to do?',
        choices: ['View Products for Sale', 'View Low Invetory', 'Add to Inventory', 'Add New Product'],
        name: 'option'
      }
    ])
    .then(res => {
      console.log('option picked:', res.option);
      switch (res.option) {
        case 'View Products for Sale':
          console.log('View Products for Sale..');
          viewProductsForSale(con);
          break;
        case 'View Low Invetory':
          viewLowInventory(con);
          break;
        case 'Add to Inventory':
          promptAddToInventory(con);
          break;
        case 'Add New Product':
          console.log('not tested');
        // prompt addnew product shit
      }
    });
};

const promptInputAgain = con => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      { type: 'list', message: 'Do you want to do something else?', choices: ['Yes', 'No'], name: 'answer' }
    ])
    .then(res => {
      if (res.answer === 'Yes') {
        promptInput(con);
      } else {
        con.end();
      }
    });
};

const promptAddToInventory = con => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      { type: 'input', message: 'Enter product ID', name: 'item_id' },
      { type: 'input', message: 'Enter quanity', name: 'quantity' }
    ])
    .then(res => {
      checkItemID(con, res.item_id, parseInt(res.quantity));
    });
};

const viewProductsForSale = con => {
  con.query(`SELECT item_id, product_name, price, stock_quantity FROM products `, function(err, res, fields) {
    if (err) throw err;
    console.log('ID \t Price \t Quantity \t Product');
    console.log('---------------------------------------------');
    res.forEach(product => {
      console.log(`${product.item_id} \t ${product.price} \t ${product.stock_quantity} \t\t ${product.product_name} `);
    });
    promptInputAgain(con);
  });
};

const viewLowInventory = con => {
  con.query(`SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 6`, function(err, res, fields) {
    if (err) throw err;
    console.log('ID \t Price \t Quantity \t Product');
    console.log('---------------------------------------------');
    res.forEach(product => {
      console.log(`${product.item_id} \t ${product.price} \t ${product.stock_quantity} \t\t ${product.product_name} `);
    });
    promptInputAgain(con);
  });
};

const addToInventory = (con, item_id, quantity) => {
  con.query(`UPDATE products SET stock_quantity = stock_quantity + ${quantity} WHERE item_id = ${item_id}`, function(err, res, fields) {
    if (err) throw err;
    console.log(`UPDATED PRODUCT ID #${item_id}. ADDED ${quantity} TO INVENTORY.\n`);
    viewProductsForSale(con);
  });
};

const checkItemID = (con, item_id, quanity) => {
  console.log('check item id called');
  con.query(
    ` SELECT item_id
    FROM products
    WHERE item_id = ${item_id}`,
    function(err, res, fields) {
      if (err) throw err;
      if (!res.length) {
        console.log(`Item does not exists with ID ${item_id}`);
        promptAddToInventory(con);
      } else {
        addToInventory(con, item_id, quanity);
      }
    }
  );
};

const addNewProduct = (con, product, department, price, quantity) => {
  con.query(
    `INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES (${product}, ${department}, ${price}, ${quantity});`,
    function(err, res, fields) {
      if (err) throw err;
      console.log('product added...');
      //   viewProductsForSale(con);
    }
  );
};

const con = initDBConnection();
promptInput(con);
