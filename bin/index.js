#! /usr/bin/env node
import inquirer from 'inquirer';
import { program } from "commander"
import nconf from 'nconf'
import fs from 'fs'
import path from 'path';
import createProject from './utils/create-project.js'
import chalk from "chalk"
import { fileURLToPath } from 'url';
import figlet from 'figlet'

// program.command("module").description("Create module").argument('<string>', "module name").action((str) => {
//     console.log(str)
// })

const parentDir = path.join( decodeURI(fileURLToPath(import.meta.url)), '../../configration');

program.command('init').description("Create a new Project").addHelpText("after","This is simple commande to start a new project. ").action(async () => {

    try {
        const answares = await getUserChoices();
       
        fs.mkdir(answares.name, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        if (answares.projectType == "empty") {
            nconf.file('config', parentDir + '/empty-project/package-template.json');
            nconf.load((err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Configuration loaded successfully.');
            });
            nconf.set("name", answares.name)
            fs.writeFile(answares.name + "/package.json", JSON.stringify(nconf.get(),null,2), (err) => { console.log(err) })
            createProject({ template: "empty", git: false, install: false, dirName: answares.name })
        }
        else if (answares.projectType == "nemt") {
            nconf.file('config', parentDir + '/expressjs-mongodb/package-template.json');
            nconf.load((err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Configuration loaded successfully.');
            });
            nconf.set("name", answares.name)
            fs.writeFile(answares.name + "/package.json", JSON.stringify(nconf.get(), null, 2), (err) => { console.log(err) })
            createProject({ template: "nemt", git: false, install: false, dirName: answares.name })
        }
    } catch (err) {
        console.error(
            `There was an error while talking to the API: ${err.message}`,
            err
        );
    }
})

program.command("version").description("Get current version").action(()=>{
    const parentDir = path.join( decodeURI(fileURLToPath(import.meta.url)), '../../');
    nconf.file('config', parentDir + 'package.json');
    console.log(nconf.get("version"))
})
program.parse()

function getUserChoices() {
    console.log(figlet.textSync('S h z a m'))
    console.log("\n")
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Project Name?',
            type: 'input',
            validate: (projectname) => {
                if (!projectname.length) {
                    return 'Please provide a project name';
                }
                if (projectname.length <= 1 || projectname.length > 20) {
                    return 'Please provide a project name between 1 and 20 characters long';
                }

                return true;
            },
            filter: (firstName) => {
                return firstName.trim();
            }
        },
        {
            name: 'projectType',
            message: 'Which template do you want to use?',
            type: 'list',
            choices: [{ name: 'Empty Project (Nodejs/Typescript)', value: "empty" }, { name: 'With BolierPlate (Nodejs/Exprejss/Mongodb/Typescript)', value: 'nemt' }],
            validate: (options) => {
                if (!options.length) {
                    return 'Choose one of template';
                }

                return true;
            }
        }
    ]);
}
