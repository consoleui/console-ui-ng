import * as path from 'path';
import * as webpack from 'webpack';

import { extraEntryParser, getOutputHashFormat } from '../util';
import { WebpackConfigOptions } from '../webpack-config-options';
import { GlobCopyWebpackPlugin } from '../plugins/glob-copy-webpack-plugin';

const ProgressPlugin = require('webpack/lib/ProgressPlugin');

/**
 * 列举出这个文件所依赖的 webpack loader 以及他们依赖的 loader.
 *
 * require('source-map-loader')
 * require('raw-loader')
 * require('script-loader')
 * require('json-loader')
 * require('url-loader')
 * require('file-loader')
 */

export function getCommonConfig(wco: WebpackConfigOptions) {
    const { projectRoot, distRoot, buildOptions, appConfig } = wco;

    const appRoot = path.resolve(projectRoot, appConfig.root);
    const appOutput = path.resolve(projectRoot, appConfig.outDir);
    const nodeModules = path.resolve(projectRoot, 'node_modules');

    let extraPlugins: any[] = [];
    let extraRules: any[] = [];
    let entryPoints: { [key: string]: string[] } = {};

    if (appConfig.main) {
        entryPoints['main'] = [path.resolve(appRoot, appConfig.main)];
    }

    if (appConfig.polyfills) {
        entryPoints['polyfills'] = [path.resolve(appRoot, appConfig.polyfills)];
    }

    // determine hashing format
    const hashFormat = getOutputHashFormat(buildOptions.outputHashing);

    // 处理全局脚本
    if (appConfig.scripts && appConfig.scripts.length > 0) {
        const globalScripts = extraEntryParser(appConfig.scripts, appRoot, 'scripts');

        // add entry points and lazy chunks
        globalScripts.forEach( script => {
            let scriptPath = `script-loader!${script.path}`;
            entryPoints[script.entry] = (entryPoints[script.entry] || []).concat(scriptPath);
        });
    }

    // process asset entries
    if (appConfig.assets) {
        extraPlugins.push(new GlobCopyWebpackPlugin({
            patterns: appConfig.assets,
            globOptions: {cwd: appRoot, dot: true, ignore: '**/.gitkeep'}
        }));
    }

    // 显示进度
    extraPlugins.push(new ProgressPlugin({ profile: true, colors: true }));

    return {
        devtool: buildOptions.sourcemaps ? 'source-map' : false,
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules', nodeModules],
            symlinks: true
        },
        resolveLoader: {
            modules: [nodeModules, 'node_modules']
        },
        context: __dirname,
        entry: entryPoints,
        output: {
            path: appOutput,
            publicPath: '',
            filename: `[name].bundle.js`,
            chunkFilename: `[id].chunk.js`
        },
        module: {
            rules: [
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.(eot|svg)$/, loader: `file-loader?name=[name]${hashFormat.file}.[ext]` },
                {
                    test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                    loader: `url-loader?name=[name]${hashFormat.file}.[ext]&limit=10000`
                }
            ].concat(extraRules)
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin()
        ].concat(extraPlugins),
        node: {
            fs: 'empty',
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
