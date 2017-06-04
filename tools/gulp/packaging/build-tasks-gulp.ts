import { task, src, dest, start } from 'gulp';
import { join } from 'path';
import { main as tsc } from '@angular/tsc-wrapped';
import { SOURCE_ROOT, DIST_ROOT, HTML_MINIFIER_OPTIONS } from '../build-config';
import { sequenceTask, sassBuildTask, copyTask, triggerLivereload } from '../util/task-helper';
import { buildPackageBundles } from './build-bundles';

// There are no type definitions available for these imports.
const inlineResources = require('../../../scripts/release/inline-resources');
const htmlmin = require('gulp-htmlmin');
// const inlineNg2Template = require('gulp-inline-ng2-template');
const watch = require('gulp-watch');

/**
 * 创建一组能构建特定包（package）的任务
 * @param packageName 包名，指定包名必须是 'src/' 目录下的某一个文件夹名
 * @param requirePackages 当前包构建之前需要前置构建的包，一般为被依赖的包
 */
export function createPackageBuildTasks(packageName: string, requirePackages: string[] = [], ) {
    // 重定向包名为 'consoleui' 的包到实际开发目录 'lib/' 。
    const packageRoot = join(SOURCE_ROOT, packageName === 'consoleui' ? 'lib' : packageName);
    const packageOut = join(DIST_ROOT, packageName);

    const tsconfigBuild = join(packageRoot, 'tsconfig-build.json');
    const tsconfigTests = join(packageRoot, 'tsconfig-tests.json');

    // 指定通用包入口文件名称，方便访问
    const esmMainFile = join(packageOut, 'index.js');

    // 指定打包时需要拷贝的资源文件
    // const assetsGlob = join(packageRoot, '**/*.+(html|scss|css)');

    // Glob that matches all style files that need to be copied to the package output.
    const stylesGlob = join(packageRoot, '**/*.+(scss|css)');

    // Glob that matches every HTML file in the current package.
    const htmlGlob = join(packageRoot, '**/*.html');


    // 主要构建任务列表，这些任务会按正确的顺序执行相关的子任务
    task(`${packageName}:clean-build`, sequenceTask('clean', `${packageName}:build`));

    task(`${packageName}:build`, sequenceTask(
        // 在构建之前构建所有的依赖
        ...requirePackages.map(pkgName => `${pkgName}:build`),
        // 构建 ESM 和 资源（assets）
        [`${packageName}:build:esm`, `${packageName}:assets`],
        // 内联静态资源到 ESM 输出文件
        `${packageName}:assets:inline`,
        // 打包最终的 ESM 输出
        // `${packageName}:build:bundles`,
    ));

    // TypeScript 构建任务。构建用于打包发布的 ESM, FESM, UMD 文件
    task(`${packageName}:build:esm`, () => tsc(tsconfigBuild, {basePath: packageRoot}));
    task(`${packageName}:build:esm:tests`, () => tsc(tsconfigTests, {basePath: packageRoot}));

    // task(`${packageName}:build:bundles`, () => buildPackageBundles(esmMainFile, packageName));

    // 关于资源的任务。构建 SASS 文件为内联的 CSS 文件，拷贝 HTML 文件到 ESM 构建输出目录
    task(`${packageName}:assets`, [
        `${packageName}:assets:scss`, `${packageName}:assets:copy-styles`, `${packageName}:assets:html`
    ]);

    task(`${packageName}:assets:scss`, sassBuildTask(packageOut, packageRoot, true));
    task(`${packageName}:assets:copy-styles`, copyTask(stylesGlob, packageOut));
    task(`${packageName}:assets:html`, () => {
        return src(htmlGlob).pipe(htmlmin(HTML_MINIFIER_OPTIONS)).pipe(dest(packageOut));
    });

    task(`${packageName}:assets:inline`, () => inlineResources(packageOut));

    task(`${packageName}:watch`, () => {
        // gulp 原生的 watch 在 WSL 上不好用，坐等 WSL 升级
        // watch(join(packageRoot, '**/*.+(ts|scss|html)'), {mode: 'poll'}, [`${packageName}:build`, triggerLivereload]);
        watch(join(packageRoot, '**/*.+(ts|scss|html)'), {usePolling: true}, () => {
            start(`${packageName}:build`);
        });
    });
}
