import { createPackageBuildTasks } from './packaging/build-tasks-gulp';

// Hack for Ubuntu on Windows
try {
    require('os').networkInterfaces();
}catch(e) {
    require('os').networkInterfaces = () => ({});
}

/** Create gulp tasks to build the different packages in the project. */
createPackageBuildTasks('consoleui');

import './tasks/clean';
import './tasks/develop';

import './tasks/release';
