const inquirer = require("inquirer");
const server = require("./server");

const initalPrompts = ["View all Employees", "View all Employees by Department", "View all Employees by Manager", 
                        "Add Employee", "Remove Employee", "Update Employee Role","Update Employee Manager",
                        "Remove Role", "Remove Department","Add Department", "Quit"];

server.getAllDepartments();
server.getAllManagers();

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
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[4]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[5]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[6]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[7]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[8]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[9]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[10]:
                    server.end_program();
                    break;
                default:
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
            let mgr_num = (server.manager_array.indexOf(option.mgr_choice) + 1);
            server.employeesByManager(option.mgr_choice, mgr_num);
        }) 
}

exports.initPrompt = initPrompt;