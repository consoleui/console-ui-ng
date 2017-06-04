import { BuildOptions } from './build-options';

export interface WebpackConfigOptions {
    projectRoot: string;
    sourceRoot: string;
    distRoot: string;
    buildOptions: BuildOptions;
    appConfig?: any;
}
