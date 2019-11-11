# bamazon

Bamazon is a command line application that lets the user view information about their product databases. The user can view, create, add, or modify products / departments in the database from the application.

## Usage

1. Download or clone the repository
2. Run
   ```
   npm install
   ```
3. Setup MySQL database locally
4. Run the sql file localted in ~/assets/scripts/bamazon_schema.sql in SQL IDE
5. Navigate to ~/assets/scripts/connectDB.js and update the connection string
6. Navigate to ~/assets/scripts/ in the terminal
7. Run
   ```
   node bamazonCustomer
   ```
   or
   ```
   node bamazonManager
   ```
   or
   ```
   node bamazonSupervisor
   ```

## Example Output

```
node bamazonCustomer
```

![bamazonCustomer](assets/images/bamazonCustomer.png?raw=true 'bamazonCustomer')

```
node bamazonManager
```

![bamazonManager1](assets/images/bamazonManager1.png?raw=true 'bamazonManager1')

![bamazonManager2](assets/images/bamazonManager2.png?raw=true 'bamazonManager2')

```
node bamazonSupervisor
```

![bamazonSupervisor](assets/images/bamazonSupervisor.png?raw=true 'bamazonSupervisor')

## Built With

- node.js
- inquirer.js
- mysql.js
- SQL database

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/doanja/Recipe-Sluts/blob/master/LICENSE) file for details
