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

 // arrays to store objects for all employees, roles and managers
 // these arrays are used as choices for inquirer functions 
const all_staff = [];
const department_array = [];
const manager_array = [];
const employee_roles =[];

let getAllDepartments = () => {

    connection.query(`SELECT department_name, id FROM company_department;`, function(err, result){

        if (err) throw err;

        result.forEach(dept => {
            let dept_details = {
                name: dept.department_name,
                id: dept.id
            };
            department_array.push(dept_details);
        });
    });
}

let getAllManagers = () => {

    connection.query(`SELECT id, first_name, last_name FROM employee_personal_details WHERE manager_id IS NULL OR 0;`, function(err, result){

        if (err) throw err;
        
        result.forEach(mgr => {
            let mgr_name = (`${mgr.first_name} ${mgr.last_name}`);
            let mgr_details = {
                name: mgr_name,
                id: mgr.id
            }
            manager_array.push(mgr_details);
        });
    });
}

let getAllStaff = () => {

    connection.query(`SELECT id, first_name, last_name FROM employee_personal_details WHERE manager_id is NOT NULL;`, function(err, result){

        result.forEach(staff => {
            let staff_details = {
                name: `${staff.first_name} ${staff.last_name}`,
                id: staff.id
            };
            all_staff.push(staff_details);
        });
    });
}

let getEmployeeRoles = () => {

    connection.query(`SELECT employee_title, id FROM employee_role_details WHERE manager_num IS NULL`, function(err, result){

        if (err) throw err;
        
        result.forEach(role => {
            let role_details = {
                name: role.employee_title,
                id: role.id
            };
            employee_roles.push(role_details);
        });
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

let addNewEmployee = (first_name, last_name, role_id, manger_id) => {

    connection.query(`INSERT INTO employee_personal_details (first_name, last_name,role_id, manager_id)
                        VALUES ('${first_name}','${last_name}',${role_id}, ${manger_id});`, function(err, result){

            if (err) throw err;

            console.log(`New Employee Added`);
            getAllStaff();
            inquirer.initPrompt();
        });
}

let removeEmployee = (employee_name, employee_id) => {

    connection.query(`DELETE FROM employee_records_db.employee_personal_details WHERE id = ${employee_id};`, function(err, result){

        if (err) throw(err);

        console.log(`${employee_name}'s details have been removed.`);
        getAllStaff();
        inquirer.initPrompt();
    })
}

let updateEmployeeRole =(id, role) => {

    connection.query(`UPDATE employee_personal_details SET role_id = ${role} WHERE id = ${id};`, function(err, result){

        if(err) throw (err);

        console.log(`Employee role has been updated`)
        inquirer.initPrompt();
        getAllStaff();
    })


}

let updateEmployeeManager = (employee_id, manager_num) => {

    connection.query(`UPDATE employee_personal_details SET manager_id = ${manager_num} WHERE id = ${employee_id};`, function(err, result){

        if(err) throw(err);

        console.log(`Updated Manager for employee id: ${employee_id}`);
        inquirer.initPrompt()
    })
}

let end_program = () => {

    connection.end(function(err) {
        if (err) throw err;

        console.log(`Thank you for using the Employee Management Program`)
      });
}
module.exports = {
    getAllStaff,
    getEmployeeRoles,
    getAllEmployees,
    getAllDepartments,
    getAllManagers,
    employeesByDept,
    employeesByManager,
    addNewEmployee,
    removeEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    end_program,
    department_array,
    all_staff,
    employee_roles,
    manager_array
}
