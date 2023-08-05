import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';

import type { Options } from './types';
import { copyTemplateFiles } from './copy-template-files';

const templateDirectory: { [key: string]: string } = {
    empty: "empty-project",
    nemt: "Expressjs-monogodb"
}
export async function createProject(options: Options) {
    const targetDirectory = process.cwd() + "/" + options.dirName;
    const template = path.resolve(
        __dirname,
        '../templates',
        templateDirectory[options.template.toLowerCase()]
    );
    console.log(templateDirectory)
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
        console.log(`\t\t2. npm/yarn i\n`)
    } catch (error) {
        console.log('%s Error occurred', chalk.red.bold('ERROR'));
    }
}

function installPackages(targetDirectory: string) {
    throw new Error('Function not implemented.');
}
