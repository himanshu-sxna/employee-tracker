const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("./inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345sql789",
    database: "employee_records_db"
  });

const department_array = [];
const manager_array = [];

let getAllDepartments = () => {

    connection.query(`SELECT department_name FROM company_department;`, function(err, result){

        if (err) throw err;

        result.forEach(dept => {
            department_array.push(dept.department_name);
        });
    });
}

let getAllManagers = () => {

    connection.query(`SELECT first_name, last_name FROM employee_personal_details WHERE manager_id IS NULL;`, function(err, result){

        if (err) throw err;
        
        result.forEach(mgr => {
            let mgr_name = `${mgr.first_name} ${mgr.last_name}`;
            manager_array.push(mgr_name);
        })
    });
}

let getAllEmployees = () => {

    connection.query(`SELECT employee_personal_details.first_name, employee_personal_details.last_name, 
                    employee_role_details.employee_title,employee_role_details.employee_salary, company_department.department_name 
                    FROM employee_personal_details INNER JOIN employee_role_details ON employee_personal_details.role_id = employee_role_details.id 
                    INNER JOIN company_department ON employee_role_details.dept_id = company_department.id 
                    ORDER BY employee_role_details.employee_salary DESC;`, function(err, result){

            if (err) throw err;

            console.table(result);
            inquirer.initPrompt();
        });
}

let employeesByDept = (department) => {

    connection.query(`SELECT employee_personal_details.first_name, employee_personal_details.last_name, 
                    employee_role_details.employee_title,employee_role_details.employee_salary, company_department.department_name 
                    FROM employee_personal_details INNER JOIN employee_role_details ON employee_personal_details.role_id = employee_role_details.id 
                    INNER JOIN company_department ON employee_role_details.dept_id = company_department.id
                    WHERE company_department.department_name = "${department}" 
                    ORDER BY employee_role_details.employee_salary DESC;`, function(err, result){

            if (err) throw err;
                        
            console.table(result);   
            inquirer.initPrompt();      
        });
}

let employeesByManager = (manager_name,manager_id) => {

    connection.query(`SELECT employee_personal_details.first_name, employee_personal_details.last_name, 
                    employee_role_details.employee_title,employee_role_details.employee_salary, company_department.department_name 
                    FROM employee_personal_details INNER JOIN employee_role_details ON employee_personal_details.role_id = employee_role_details.id 
                    INNER JOIN company_department ON employee_role_details.dept_id = company_department.id
                    WHERE employee_personal_details.manager_id = ${manager_id} 
                    ORDER BY employee_personal_details.first_name;`, function(err, result){

            if (err) throw err;
            
            console.log(`${manager_name} manages the below employees:`)
            console.table(result);
            inquirer.initPrompt();
        });
}

let end_program = () => {

    connection.end(function(err) {
        if (err) throw err;

        console.log(`Thank you for using the Employee Management Program`)
      });
}
module.exports = {
    getAllEmployees,
    getAllDepartments,
    getAllManagers,
    employeesByDept,
    employeesByManager,
    department_array,
    end_program,
    manager_array
}
/*
exports.getAllEmployees = getAllEmployees;
exports.getAllDepartments = getAllDepartments;
exports.getAllManagers = getAllManagers;
exports.employeesByDept = employeesByDept;
exports.employeesByManager = employeesByManager;
exports.department_array = department_array;
exports.manager_array = manager_array;
*/