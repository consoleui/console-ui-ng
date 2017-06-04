import { task, start } from 'gulp';
import * as webpack from 'webpack';
import * as path from 'path';

import { sequenceTask, serverTask, cleanTask } from '../util/task-helper';
import { BuildOptions, WebpackConfig, WebpackConfigOptions, getWebpackStatsConfig, getDefaultBuildOptions } from '../webpack';
import { PROJECT_ROOT, SOURCE_ROOT, DIST_ROOT } from '../build-config';


// const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const watch = require('gulp-watch');

const devAppName = 'demo';

function buildWebpackConfig (appName: string) {
    const buildOptions: BuildOptions = getDefaultBuildOptions();
    buildOptions.environment = 'dev';
    buildOptions.outputPath = path.resolve(DIST_ROOT, appName);
    buildOptions.aot = false;
    buildOptions.sourcemaps = true;
    // buildOptions.baseHref = '';
    // buildOptions.deployUrl;
    buildOptions.app = appName;

    const appConfig = require(path.resolve(SOURCE_ROOT, appName, 'build.json'));
    // console.log(buildOptions);
    // console.log(appConfig);
    const webpackConfig = new WebpackConfig(buildOptions, appConfig);

    return webpackConfig.buildConfig();
}

task('clean:devapp', cleanTask(path.resolve(DIST_ROOT, devAppName)));

task('build:devapp', ['consoleui:build'], (done: Function) => {
    const config = buildWebpackConfig(devAppName);
    const webpackCompiler = webpack(config);
    const statsConfig = getWebpackStatsConfig(true);
    /*webpack(config, (err: any, stats: any) => {
        console.log(stats.toString());
        // console.log(stats);

        callback(); // 异步任务的关键之处，如果没有这行，任务会一直阻塞
    });*/
     const callback: webpack.compiler.CompilerCallback = (err: any, stats: any) => {
         console.log(stats.toString(statsConfig));
         done();
     };

     webpackCompiler.run(callback);
});

task('watch:devapp', (done: Function) => {
    let watchFiles = [path.join(SOURCE_ROOT, devAppName, '**/*.+(ts|scss|html)'), 
        path.join(SOURCE_ROOT, 'lib', '**/*.+(js|ts|css|scss|html)')];
    watch(watchFiles, {usePolling: true}, () => {
        start('build:devapp');
    });
});

task(':webpack-serve:devapp', (done: Function) => {
    const config = buildWebpackConfig(devAppName);
    const webpackCompiler = webpack(config);

    const server = new WebpackDevServer(webpackCompiler, {
        stats: getWebpackStatsConfig(false)
    });

    server.listen(4200, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:8080');
        done();
    });
});

task(':serve:devapp', serverTask(path.join(DIST_ROOT, devAppName), true));

task('serve:devapp', ['build:devapp'], sequenceTask(
    [':serve:devapp', 'watch:devapp']
));

