const inquirer = require("inquirer");
const server = require("./server");

const initalPrompts = ["View all Employees", "View all Employees by Department", "View all Employees by Manager", 
                        "Add Employee", "Remove Employee", "Update Employee Role","Update Employee Manager","Quit"];


let initPrompt = () => { 

    inquirer
        .prompt([
            {
                name:"start_prompts",
                type: "list",
                message: "What would you like to do ?",
                choices: initalPrompts
            },
        ])
        .then((option) => {

            switch (true) {
                case option.start_prompts == initalPrompts[0]:
                    server.getAllEmployees();
                    break;
                case option.start_prompts == initalPrompts[1]:
                    getAllEmployeesbyDept();
                    break;
                case option.start_prompts == initalPrompts[2]:
                    getAllEmployeesbyManager();
                    break;
                case option.start_prompts == initalPrompts[3]:
                    addEmployee();
                    break;
                case option.start_prompts == initalPrompts[4]:
                    removeEmployee();
                    break;
                case option.start_prompts == initalPrompts[5]:
                    updateRole();
                    break;
                case option.start_prompts == initalPrompts[6]:
                    updateManager();
                    break;
                case option.start_prompts == initalPrompts[7]:
                    server.end_program();
                    break;
            }
        });
}

let getAllEmployeesbyDept = () => {
    
    inquirer
        .prompt([
            {
                name: "dept_choice",
                type: "list",
                message: "Please choose the department:",
                choices: server.department_array,
            }
        ])
        .then((option)=> {
            server.employeesByDept(option.dept_choice);
        })
}

let getAllEmployeesbyManager = () => {
    
    inquirer
        .prompt([
            {
                name: "mgr_choice",
                type: "list",
                message: "Please choose the Manager:",
                choices: server.manager_array,
            }
        ])
        .then((option)=> {
            let mgr_num = (server.manager_array.find(({name}) => name === option.mgr_choice )).id;
            server.employeesByManager(option.mgr_choice, mgr_num);
        }) 
}

let addEmployee =() => {

    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Please enter employee's First Name:",
                validate: (input) => {
                    if (input.length < 1) {
                        console.log("First name cannot be blank");
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter employee's Last Name:",
                validate: (input) => {
                    if (input.length < 1) {
                        console.log("Last name cannot be blank");
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "role",
                type: "list",
                message: "Please choose employee role",
                choices: server.employee_roles
            },
        ])
        .then((option)=> {

            let role_id = (server.employee_roles.find(({name})=> name === option.role)).id;
            let manager_id;
            switch (role_id) {
                case 6 || 7:
                    manager_id = 3;
                    break;
                case 8:
                    manager_id = 1;
                case 9:
                    manager_id = 2;
                    break;
                case 10:
                    manager_id = 4;
                    break;
                case 11:
                    manager_id = 5;
                    break;
            };
            server.addNewEmployee(option.first_name, option.last_name, role_id, manager_id);
        })
}

let removeEmployee = () => {

    inquirer
        .prompt([
            {
                name: "employee_name",
                type: "list",
                message: "Please select Employee to remove",
                choices: server.all_staff
            }
        ])
        .then((option)=> {
            let employee_to_remove = server.all_staff.find(({name})=> name === option.employee_name);
            server.removeEmployee(option.employee_name, employee_to_remove.id);
        })
}

let updateRole = () => {

    inquirer
        .prompt([
            {
                name: "employee",
                type: "list",
                message: "Please choose employee to update:",
                choices: server.all_staff
            },
            {
                name: "role",
                type: "list",
                message: "Please choose new role:",
                choices: server.employee_roles
            }
        ])
        .then((option) => {

            let employee_to_update = server.all_staff.find(({name})=> name === option.employee).id;
            let updated_role = server.employee_roles.find(({name}) => name === option.role).id;

            server.updateEmployeeRole(employee_to_update, updated_role);
        })
}

let updateManager = () => {

        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Please choose employee:",
                    choices: server.all_staff
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Please choose new manager:",
                    choices: server.manager_array
                }
            ])
            .then((option) => {

                let employee_to_update = server.all_staff.find(({name})=> name === option.employee).id;
                let new_manager = server.manager_array.find(({name}) => name === option.manager).id;

                server.updateEmployeeManager(employee_to_update, new_manager);
            })

}

exports.initPrompt = initPrompt;