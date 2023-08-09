import chalk from 'chalk';
import Listr from 'listr';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

import { copyTemplateFiles } from './copy-template-files.js';

const templateDirectory = {
    empty: "empty-project",
    nemt: "Expressjs-monogodb"
}
export default async function createProject(options) {
    const targetDirectory = process.cwd() + "/" + options.dirName;
    
    const template = resolve(
        decodeURI(fileURLToPath(import.meta.url)),
        '../../../templates',
        templateDirectory[options.template.toLowerCase()]
    );
    const tasks = new Listr([
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(template, targetDirectory)
        },
        {
            title: 'Install dependencies',
            task: () => installPackages(targetDirectory),
            skip: () => {
                if (!options.install) {
                    return 'Pass --install or -i to automatically install dependencies';
                }
            }
        }
    ]);

    try {
        await tasks.run();
        console.log('%s Project ready', chalk.green.bold('DONE'));
        console.log("\n\tSteps To run")
        console.log(`\t\t1. cd ${options.dirName}`)
        console.log(`\t\t2. npm i\n`)
    } catch (error) {
        console.log('%s Error occurred', chalk.red.bold('ERROR'));
    }
}

function installPackages(targetDirectory) {
    throw new Error('Function not implemented.');
}
