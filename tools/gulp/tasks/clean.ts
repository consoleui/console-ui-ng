import {task} from 'gulp';
import {DIST_ROOT} from '../build-config';
import {cleanTask} from '../util/task-helper';


/** Deletes the dist/ directory. */
task('clean', cleanTask(DIST_ROOT));
