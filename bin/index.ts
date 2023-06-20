#! /usr/bin/env ts-node
import inquirer from 'inquirer';

(async () => {
    try {
        const answers = await getAnswers();
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
            name: 'firstName',
            message: 'What is your first name?',
            type: 'input',
            validate: (firstName) => {
                if (!firstName.length) {
                    return 'Please provide a first name';
                }
                if (firstName.length <= 3 || firstName.length > 20) {
                    return 'Please provide a first name between 4 and 20 characters long';
                }

                return true;
            },
            filter: (firstName) => {
                return firstName.trim();
            }
        },
        {
            name: 'options',
            message: 'What would you like to guess for the given first name?',
            type: 'checkbox',
            choices: ['gender', 'nationality'],
            validate: (options: any) => {
                if (!options.length) {
                    return 'Choose at least one of the above, use space to choose the option';
                }

                return true;
            }
        }
    ]);
}
