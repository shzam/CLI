#! /usr/bin/env node
import inquirer from 'inquirer';
import { program } from 'commander';
import nconf from 'nconf';
import fs from 'fs';
import path from 'path';
import createProject from './utils/create-project.js';
import { fileURLToPath } from 'url';
import figlet from 'figlet';

import handlebars from 'handlebars';

// Load the template
// const template = fs.readFileSync('./template.hbs', 'utf8');

const parentDir = path.join(
    decodeURI(fileURLToPath(import.meta.url)),
    '../../configration'
);

program
    .command('init')
    .description('Create a new Project')
    .addHelpText('after', 'This is simple commande to start a new project. ')
    .action(async () => {
        try {
            const answares = await getUserChoices();

            fs.mkdir(answares.name, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            if (answares.projectType == 'empty') {
                nconf.file(
                    'config',
                    parentDir + '/empty-project/package-template.json'
                );
                nconf.load((err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Configuration loaded successfully.');
                });
                nconf.set('name', answares.name);
                fs.writeFile(
                    answares.name + '/package.json',
                    JSON.stringify(nconf.get(), null, 2),
                    (err) => {
                        console.log(err);
                    }
                );
                createProject({
                    template: 'empty',
                    git: false,
                    install: false,
                    dirName: answares.name
                });
            } else if (answares.projectType == 'nemt') {
                nconf.file(
                    'config',
                    parentDir + '/expressjs-mongodb/package-template.json'
                );
                nconf.load((err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Configuration loaded successfully.');
                });
                nconf.set('name', answares.name);
                fs.writeFile(
                    answares.name + '/package.json',
                    JSON.stringify(nconf.get(), null, 2),
                    (err) => {
                        console.log(err);
                    }
                );
                createProject({
                    template: 'nemt',
                    git: false,
                    install: false,
                    dirName: answares.name
                });
            }
        } catch (err) {
            console.error(
                `There was an error while talking to the API: ${err.message}`,
                err
            );
        }
    });

program
    .command('addApp')
    .description(
        'Add a new App/module with basic CRUD code. this will generate controller router and model'
    )
    .action(async () => {
        const module = path.join(
            decodeURI(fileURLToPath(import.meta.url)),
            '../../templates/modules'
        );

        const templates = [
            '/nemt/model/demo.model.hbs',
            '/nemt/model/demo.repository.hbs',
            '/nemt/model/index.hbs',
            '/nemt/demo.controller.hbs',
            '/nemt/demo.router.hbs',
            '/nemt/demo.schema.hbs',
            '/nemt/index.hbs'
        ];
        let name = await getName();
        name.name = name.name.charAt(0).toUpperCase() + name.name.slice(1);

        fs.mkdirSync('./src/apps/' + name.name, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        fs.mkdirSync(
            './src/apps/' + name.name + '/model',
            { recursive: true },
            (err) => {
                console.log(err);
            }
        );
        templates.forEach(async (template) => {
            // Load the template
            const modelTemplate = fs.readFileSync(module + template, 'utf8');
            let newName = template.replace('/nemt', '');
            newName = newName.replace('demo', name.name.toLowerCase());
            newName = newName.replace('.hbs', '.ts');
            // Compile the template
            const compiledTemplate = handlebars.compile(modelTemplate);

            const data = {
                moudleName:
                    name.name.charAt(0).toUpperCase() + name.name.slice(1),
                moduleNameLowercase: name.name.toLowerCase()
            };

            const html = compiledTemplate(data);

            fs.writeFileSync(
                './src/apps/' + name.name + newName,
                html,
                (err) => {
                    console.log(err);
                }
            );
        });
    });
program
    .command('version')
    .description('Get current version')
    .action(() => {
        const parentDir = path.join(
            decodeURI(fileURLToPath(import.meta.url)),
            '../../'
        );
        nconf.file('config', parentDir + 'package.json');
        console.log(nconf.get('version'));
    });

program.parse();

function getName() {
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Module Name?',
            type: 'input',
            validate: (projectname) => {
                if (!projectname.length) {
                    return 'Please provide a project name';
                }
                if (projectname.length <= 1 || projectname.length > 20) {
                    return 'Please provide a project name between 1 and 20 characters long';
                }
                if (projectname.includes(' ')) {
                    return 'You cant add space.';
                }
                return true;
            },
            filter: (firstName) => {
                return firstName.trim();
            }
        }
    ]);
}

function getUserChoices() {
    console.log(figlet.textSync('S h z a m ⚡'));
    console.log('\n');
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
            filter: (projectName) => {
                return projectName.trim();
            }
        },
        {
            name: 'projectType',
            message: 'Which template do you want to use?',
            type: 'list',
            choices: [
                { name: 'Empty Project (Nodejs/Typescript)', value: 'empty' },
                {
                    name: 'With BolierPlate (Nodejs/Exprejss/Mongodb/Typescript)',
                    value: 'nemt'
                }
            ],
            validate: (options) => {
                if (!options.length) {
                    return 'Choose one of template';
                }

                return true;
            }
        }
    ]);
}
