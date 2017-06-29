import { join } from 'path';
import { task, src, dest } from 'gulp';
import { PROJECT_ROOT, SOURCE_ROOT, DIST_ROOT } from '../build-config';

const libroot = join(SOURCE_ROOT, 'app/lib');
const libdist = join(DIST_ROOT, 'consoleui');
const librelease = join(DIST_ROOT, 'release');

task('release', ['consoleui:build'], (done: Function) => {
    let packageJsonFile = join(libroot, 'package.json');
    let readmeFile = join (PROJECT_ROOT, 'README.md');
    
    let libBuildFiles = join(libdist, '**/*');
    
    src([libBuildFiles, packageJsonFile, readmeFile]).pipe(dest(librelease));
});
