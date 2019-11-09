# bamazon

Bamazon is a command line application that lets the user view information about their product databases. The user can view, create, add, or modify products / departments in the database from the application.

## Usage

1. Download or clone the repository
2. Run
   ```
   npm install
   ```
3. Setup MySQL database locally
4. Navigate to ./assets/scripts/connectDB.js and update the connection string
5. Navigate to ./assets/scripts/ in the terminal
6. Run
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

![GameStart](assets/images/GameStart.png?raw=true 'GameStart')

![CorrectGuess](assets/images/CorrectGuess.png?raw=true 'CorrectGuess')

![IncorrectGuess](assets/images/IncorrectGuess.png?raw=true 'IncorrectGuess')

![GameWin](assets/images/GameWin.png?raw=true 'GameWin')

![GameOver](assets/images/GameOver.png?raw=true 'GameOver')

## Built With

- node.js
- inquirer.js
- mysql.js
- SQL database

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/doanja/Recipe-Sluts/blob/master/LICENSE) file for details
