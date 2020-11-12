const mysql = require("mysql");
const cTable = require("console.table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345sql789",
    database: "employee_records_db"
  });

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

let getAllEmployees = () => {

    connection.query(`SELECT employee_personal_details.first_name, employee_personal_details.last_name, 
                    employee_role_details.employee_title,employee_role_details.employee_salary, company_department.department_name 
                    FROM employee_personal_details INNER JOIN employee_role_details ON employee_personal_details.role_id = employee_role_details.id 
                    INNER JOIN company_department ON employee_role_details.dept_id = company_department.id 
                    ORDER BY employee_role_details.employee_salary;`, function(err, result){

                if (err) throw err;
      
                console.table(result);
                 });
}

exports.getAllEmployees = getAllEmployees;
  