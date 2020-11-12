// Dependencies
const chalk = require("chalk");
const figlet = require("figlet");

//Local Module Imports
const inquirer = require("./modules/inquirer");

// app Title style
console.log(
    chalk.cyanBright(
        figlet.textSync(`Employee Manager`, {horizontalLayout:'full'})
    )
);

// initaite inquirer
inquirer.initPrompt();
