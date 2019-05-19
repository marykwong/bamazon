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
      productTable.push([res[i].id, res[i].product_name, `$${res[i].price}`]);
    
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
		name: "id",
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
		name: "quantity",
		type: "input",
    message: "How many units do you want?",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
  }
  
]).then(function(answer) {
  //store quantity and id requests
    var quantity = answer.quantity;
    var itemID = answer.id;
    //function to purchase
    purchase(itemID, quantity);
    
    });
};

//function to handle purchase
function purchase(id, quantityNeed){
  //selection id = request id
  connection.query('SELECT * FROM Products WHERE id = ' + id, function(error, response) {
    if (error) throw err
    //check if we have enough
    if (quantityNeed <= response[0].stock_quantity){
      var totalCost = response[0].price * quantityNeed;
      console.log("Your total cost for " + quantityNeed + " " + response[0].product_name + " is " + "$"+totalCost.toFixed(2) + ". Thank you for your Business!");
      connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantityNeed + ' WHERE id = ' + id);
    } else
    {
      //return this is we don't have enough
      console.log("Insufficient quantity! We don't have enough " + response[0].product_name + " to fulfill your order.");
  };
  //prompt to buy more
  buyMore();
  });
}

//function to prompt the user if they want to buy something else
function buyMore(){
  inquirer.prompt([{
    type: "confirm",
    name: "more",
    message: "Do you want to purchase something else?"
  }]).then(function(answer){
    if (answer.more === true){
      start();
    } else {
      //end connection when they don't want to buy more
      connection.end();
    }
  })
}
