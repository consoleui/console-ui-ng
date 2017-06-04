import { NamedModulesPlugin } from 'webpack';

import { WebpackConfigOptions } from '../webpack-config-options';

export const getDevConfig = function (_wco: WebpackConfigOptions) {
    return {
        plugins: [new NamedModulesPlugin()]
    };
};
