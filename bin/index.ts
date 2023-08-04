#! /usr/bin/env ts-node
import inquirer from 'inquirer';
import { program } from "commander"
import nconf from 'nconf'
import fs from 'fs'
import path from 'path';

interface AnswareType {
    name: string;
    projectType: string
}

// program.command("module").description("Create module").argument('<string>', "module name").action((str) => {
//     console.log(str)
// })
const parentDir = path.join(__dirname, '..');
nconf.file('config', parentDir + '/configration/package-template.json');

nconf.load((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Configuration loaded successfully.');
});

const targetDirectory = process.cwd();
program.command('init').description("Create a new Project").action(async () => {

    try {
        const answers: AnswareType = await getAnswers();
        console.log('The answers are: ', answers);
        fs.mkdir(answers.name, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Directory created successfully!');
        });
        nconf.set("name", answers.name)
        fs.writeFile(answers.name + "/package.json", JSON.stringify(nconf.get()), (err) => { console.log(err) })


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
            choices: ['Empty Project (Nodejs/Typescript)', 'With BolierPlate (Nodejs/Exprejss/Mongodb/Typescript)'],
            validate: (options: any) => {
                if (!options.length) {
                    return 'Choose one of template';
                }

                return true;
            }
        }
    ]);
}
