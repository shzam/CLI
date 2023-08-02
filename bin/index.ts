#! /usr/bin/env ts-node
import inquirer from 'inquirer';
import nsconf from 'nconf'

interface AnswareType {
    name: string;
    projectType: string
}

(async () => {
    try {
        const answers: AnswareType = await getAnswers();
        console.log('The answers are: ', answers);

    } catch (err: any) {
        console.error(
            `There was an error while talking to the API: ${err.message}`,
            err
        );
    }
})();

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
