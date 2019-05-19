DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pencil", "Office Supplies", 2.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spatula", "Kitchen", 2.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Kitchen", 29.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Bedding", 10.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Popcorn", "Snacks", 2.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweater", "Clothing", 25.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earrings", "Accessories", 22.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bacon", "Food", 7.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens", "Office Supplies", 2.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Salt", "Food", 1.00, 30);
