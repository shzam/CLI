#! /usr/bin/env ts-node
import inquirer from 'inquirer';
import { program } from "commander"
import nconf from 'nconf'
import fs from 'fs'
import path from 'path';
import { createProject } from '../utils/create-project'

interface AnswareType {
    name: string;
    projectType: string
}

// program.command("module").description("Create module").argument('<string>', "module name").action((str) => {
//     console.log(str)
// })
const parentDir = path.join(__dirname, '..');

program.command('init').description("Create a new Project").action(async () => {

    try {
        const answares: AnswareType = await getAnswers();
        console.log('The answers are: ', answares);
        fs.mkdir(answares.name, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        if (answares.projectType == "empty") {
            nconf.file('config', parentDir + '/configration/empty-project/package-template.json');

            nconf.load((err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Configuration loaded successfully.');
            });
            nconf.set("name", answares.name)
            fs.writeFile(answares.name + "/package.json", JSON.stringify(nconf.get(), null, 2), (err) => { console.log(err) })
            createProject({ template: "empty", git: false, install: false, dirName: answares.name })
        }
        else if (answares.projectType == "nemt") {
            nconf.file('config', parentDir + '/configration/Expressjs-monogodb/package-template.json');
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
    } catch (err: any) {
        console.error(
            `There was an error while talking to the API: ${err.message}`,
            err
        );
    }

})
program.parse()


function getAnswers() {
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Project Name?',
            type: 'input',
            validate: (projectname) => {
                if (!projectname.length) {
                    return 'Please provide a project name';
                }
                if (projectname.length <= 3 || projectname.length > 20) {
                    return 'Please provide a project name between 4 and 20 characters long';
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
            validate: (options: any) => {
                if (!options.length) {
                    return 'Choose one of template';
                }

                return true;
            }
        }
    ]);
}
