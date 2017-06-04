'use strict';

/**
 * 加载 TypeScript 编译器，然后加载 TypeScript 格式的 gulpfile 任务（task）脚本。
 * 所有的子任务脚本都在指定目录 tools/gulp/tasks 中。
 */

const path = require('path');

// 注册 TS 编译器
require('ts-node').register({
    project: path.join(__dirname, 'tools/gulp/tsconfig.json')
});

require('./tools/gulp/gulpfile');