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

const all_staff = [];
const department_array = [];
const manager_array = [];
const employee_roles =[];

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
            let mgr_name = (`${mgr.first_name} ${mgr.last_name}`);
            manager_array.push(mgr_name);
        })
    });
}

let getEmployeeRoles = () => {

    connection.query(`SELECT employee_title FROM employee_role_details`, function(err, result){

        if (err) throw err;
        
        result.forEach(role => {
            employee_roles.push(role.employee_title);
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
            
            result.forEach(item => {
                let employee_name = (`${item.first_name} ${item.last_name}`);
                all_staff.push(employee_name);
            });
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

let addNewEmployee = (first_name, last_name, role_id, manager_id) => {

    connection.query(`INSERT INTO employee_personal_details (first_name, last_name, role_id, manager_id)
                        VALUES ('${first_name}','${last_name}',${role_id},'${manager_id}');`, function(err, result){

            if (err) throw err;

            console.log(`New Employee Added`);
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
    getEmployeeRoles,
    getAllEmployees,
    getAllDepartments,
    getAllManagers,
    employeesByDept,
    employeesByManager,
    addNewEmployee,
    end_program,
    department_array,
    all_staff,
    employee_roles,
    manager_array
}
