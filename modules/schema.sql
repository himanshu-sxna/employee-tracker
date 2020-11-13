CREATE DATABASE employee_records_db;

USE employee_records_db;

CREATE TABLE company_department (
  id INTEGER AUTO_INCREMENT NOT NULL,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee_role_details (
  id INTEGER AUTO_INCREMENT NOT NULL,
  employee_title VARCHAR (100) NOT NULL,
  employee_salary MEDIUMINT NOT NULL,
  is_manager BOOLEAN NOT NULL DEFAULT false,
  manager_num INTEGER,
  PRIMARY KEY(id),
  dept_id INTEGER NOT NULL references company_department(id)
);

CREATE TABLE employee_personal_details (
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    primary key(id),
    role_id INTEGER NOT NULL references employee_role_details(id),
    manager_id INTEGER references employee_role_details(manager_id)
);

INSERT INTO company_department (department_name)
VALUES ("Sales"),
		("Legal"),
        ("Engineering"),
        ("Finance"),
        ("Admin");

INSERT INTO employee_role_details (employee_title, employee_salary, is_manager, manager_id, dept_id)
VALUES ("Sales Manager", 85000, TRUE, 1, 1),
		("Legal Manager", 125000, TRUE, 2, 2),
        ("CTO", 150000, TRUE, 3, 3),
        ("Chief Accountant", 120000, true, 4, 4),
        ("Office Manager", 75000, TRUE, 5, 5);

INSERT INTO employee_role_details (employee_title, employee_salary, dept_id)
VALUES ("Junior Dev", 65000, 3),
		("Senior Dev", 85000, 3),
        ("Sales Rep", 60000, 1),
        ("Legal Aid", 60000, 2),
        ("Junior Accountant", 60000, 4),
        ("Office Assistant", 55000, 5);

INSERT INTO employee_personal_details (first_name, last_name, role_id, manager_id)
VALUES("Jayne", "Warren", 6, 1),
		("Archer", "Feeney", 7, 2),
        ("Naya", "Dawson", 8, 3),
		("Nabila", "Alford", 9, 4),
        ("Darci", "Ahmed", 10, 5),
        ("Misha", "Gilmour", 11, 3);