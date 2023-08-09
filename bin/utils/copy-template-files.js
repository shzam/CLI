import ncp from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

export async function copyTemplateFiles(
    templateDir,
    targetDir
) {
    return copy(templateDir, targetDir, { clobber: false });
}