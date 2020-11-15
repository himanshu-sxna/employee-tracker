// Dependencies
const chalk = require("chalk");
const figlet = require("figlet");

//Local Module Imports
const inquirer = require("./modules/inquirer");
const server = require("./modules/server.js");

// app Title style
console.log(
    chalk.cyanBright(
        figlet.textSync(`Employee Manager`, {horizontalLayout:'full'})
    )
);

//initiate server js functions
server.getAllStaff();
server.getAllDepartments();
server.getAllManagers();
server.getEmployeeRoles();

// initaite inquirer
inquirer.initPrompt();


