//node modules
var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'newuser',
  password: '',
  database: 'bamazon_DB'
})

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err
  // run the start function after the connection is made to show what's on sale
  start()
  connection.end()
})

//function to display what's on sale
function start(){
  connection.query('SELECT * FROM products', function (err, res) {
    //table display
    var productTable = new Table({
      head: ['Item ID', 'Product Name', 'Price'],
      colWidths: [10, 40, 12]
  });
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      //push to table
      productTable.push([res[i].sku, res[i].product_name, `$${res[i].price}`]);
    
    }
    //display
    console.log(productTable.toString());
    //prompt user
    askID();
  })
}

//function to ask user for id and quantity
function askID(){
	inquirer.prompt([{
		name: "itemID",
		type: "input",
    message: "Please enter the Item ID for the product that you want.",
    //validate input
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
  }, 
  {
		name: "stockQuantity",
		type: "input",
    message: "How many units do you want?",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
	}]).then(function(answer) {

  });
}
