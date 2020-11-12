const inquirer = require("inquirer");
const server = require("./server");

const initalPrompts = ["View all Employees", "View all Employees by Department", "View all Employees by Manager", 
                        "Add Employee", "Remove Employee", "Update Employee Role","Update Employee Manager",
                        "Remove Role", "Remove Department","Add Department"]

let initPrompt = () => {

    inquirer
        .prompt([

            {
                name:"start_prompts",
                type: "list",
                message: "What would you like to do ?",
                choices: initalPrompts
            }
        ])
        .then((option) => {

            switch (true) {

                case option.start_prompts == initalPrompts[0]:
                    server.getAllEmployees();
                    break;
                case option.start_prompts == initalPrompts[1]:
                    console.log(option.start_prompts);
                    break;
                case option.start_prompts == initalPrompts[2]:
                    console.log(option.start_prompts);
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
                default:
                    break;
            }
        });
}

exports.initPrompt = initPrompt;