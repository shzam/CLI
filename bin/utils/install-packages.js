import { projectInstall } from 'pkg-install';

export function installPackages(targetDir) {
    return projectInstall({
        cwd: targetDir
    });
}