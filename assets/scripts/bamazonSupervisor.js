const inquirer = require('inquirer');
const initDBConnection = require('./connectDB');

const promptInput = con => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What do you want to do?',
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'option'
      }
    ])
    .then(res => {
      switch (res.option) {
        case 'View Product Sales by Department':
          viewProductSalesByDepartment(con);
          break;
        case 'Create New Department':
          promptDepartmentInput(con);
          break;
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

const promptDepartmentInput = con => {
  inquirer
    .prompt([
      { type: 'input', message: 'Enter department name', name: 'department' },
      { type: 'input', message: 'Enter over head costs', name: 'costs' }
    ])
    .then(res => {
      createNewDepartment(con, res.department, parseInt(res.costs));
    });
};

const viewProductSalesByDepartment = con => {
  console.log('viewProductSalesByDepartment()');

  con.query(
    `select 
    dep.department_id as 'Department ID',
    dep.department_name as 'Department',
    dep.over_head_costs as 'Over Head Costs',
    SUM(pro.product_sales) as 'Product Sales',
    SUM(pro.product_sales) - dep.over_head_costs as 'Total Profit'
    from departments as dep
    left join (products as pro ) on  (dep.department_name = pro.department_name)
    group by dep.department_id`,
    function(err, res, fields) {
      if (err) throw err;
      console.log('Department ID \t Department \t Over Head Costs \t Product Sales \t Total Profit');
      console.log('----------------------------------------------------------------------------------------');
      //   res.forEach(department => {
      //     console.log(`${department} `);
      //   });
      console.log(res[0].over_head_costs);
      //   console.log(res);
      //   promptInput(con);
      con.end();
    }
  );
};

const createNewDepartment = (con, department, costs) => {
  con.query(
    'INSERT INTO departments SET ?',
    {
      department_name: department,
      over_head_costs: costs
    },
    function(err, res, fields) {
      if (err) throw err;
      console.log('DEPARTMENT ADDED');
      promptInputAgain(con);
    }
  );
};

const con = initDBConnection();
// promptInput(con);
viewProductSalesByDepartment(con);
