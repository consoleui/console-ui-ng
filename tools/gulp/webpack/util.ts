import * as path from 'path';
import { BuildOptions } from './build-options';

const webpackOutputOptions = {
  colors: true,
  hash: true,
  timings: true,
  chunks: true,
  chunkModules: false,
  children: false, // listing all children is very noisy in AOT and hides warnings/errors
  modules: false,
  reasons: false,
  warnings: true,
  assets: false, // listing all assets is very noisy when using assets directories
  version: false
};

const verboseWebpackOutputOptions = {
  children: true,
  assets: true,
  version: true,
  reasons: true,
  chunkModules: false // TODO: set to true when console to file output is fixed
};

export function getWebpackStatsConfig(verbose = false) {
  return verbose
    ? Object.assign(webpackOutputOptions, verboseWebpackOutputOptions)
    : webpackOutputOptions;
}

export interface ExtraEntry {
  input: string;
  output?: string;
  lazy?: boolean;
  path?: string;
  entry?: string;
}

// Filter extra entries out of a arran of extraEntries
export function lazyChunksFilter(extraEntries: ExtraEntry[]) {
  return extraEntries
    .filter(extraEntry => extraEntry.lazy)
    .map(extraEntry => extraEntry.entry);
}

// convert all extra entries into the object representation, fill in defaults
export function extraEntryParser(
  extraEntries: (string | ExtraEntry)[],
  appRoot: string,
  defaultEntry: string
): ExtraEntry[] {
  return extraEntries
    .map((extraEntry: string | ExtraEntry) =>
      typeof extraEntry === 'string' ? { input: extraEntry } : extraEntry)
    .map((extraEntry: ExtraEntry) => {
      extraEntry.path = path.resolve(appRoot, extraEntry.input);
      if (extraEntry.output) {
        extraEntry.entry = extraEntry.output.replace(/\.(js|css)$/i, '');
      } else if (extraEntry.lazy) {
        extraEntry.entry = extraEntry.input.replace(/\.(js|css|scss|sass|less|styl)$/i, '');
      } else {
        extraEntry.entry = defaultEntry;
      }
      return extraEntry;
    });
}

export interface HashFormat {
  chunk: string;
  extract: string;
  file: string;
}

export function getOutputHashFormat(option: string, length = 20): HashFormat {
  /* tslint:disable:max-line-length */
  const hashFormats: { [option: string]: HashFormat } = {
    none:    { chunk: '',                       extract: '',                         file: ''                  },
    media:   { chunk: '',                       extract: '',                         file: `.[hash:${length}]` },
    bundles: { chunk: `.[chunkhash:${length}]`, extract: `.[contenthash:${length}]`, file: ''                  },
    all:     { chunk: `.[chunkhash:${length}]`, extract: `.[contenthash:${length}]`, file: `.[hash:${length}]` },
  };
  /* tslint:enable:max-line-length */
  return hashFormats[option] || hashFormats['none'];
}

const pollDefault = 2000;

// defaults for BuildOptions
export const baseBuildCommandOptions: any = [
  {
    name: 'target',
    type: String,
    default: 'development',
    aliases: ['t', { 'dev': 'development' }, { 'prod': 'production' }],
    description: 'Defines the build target.'
  },
  {
    name: 'environment',
    type: String,
    aliases: ['e'] ,
    description: 'Defines the build environment.'
  },
  {
    name: 'output-path',
    type: 'Path',
    aliases: ['op'],
    description: 'Path where output will be placed.'
  },
  {
    name: 'aot',
    type: Boolean,
    description: 'Build using Ahead of Time compilation.'
  },
  {
    name: 'sourcemaps',
    type: Boolean,
    aliases: ['sm', 'sourcemap'],
    description: 'Output sourcemaps.'
  },
  {
    name: 'vendor-chunk',
    type: Boolean,
    default: true,
    aliases: ['vc'],
    description: 'Use a separate bundle containing only vendor libraries.'
  },
  {
    name: 'base-href',
    type: String,
    aliases: ['bh'],
    description: 'Base url for the application being built.'
  },
  {
    name: 'deploy-url',
    type: String,
    aliases: ['d'],
    description: 'URL where files will be deployed.'
  },
  {
    name: 'verbose',
    type: Boolean,
    default: false,
    aliases: ['v'],
    description: 'Adds more details to output logging.'
  },
  {
    name: 'progress',
    type: Boolean,
    default: true,
    aliases: ['pr'],
    description: 'Log progress to the console while building.'
  },
  {
    name: 'i18n-file',
    type: String,
    description: 'Localization file to use for i18n.'
  },
  {
    name: 'i18n-format',
    type: String,
    description: 'Format of the localization file specified with --i18n-file.'
  },
  {
    name: 'locale',
    type: String,
    description: 'Locale to use for i18n.'
  },
  {
    name: 'extract-css',
    type: Boolean,
    aliases: ['ec'],
    description: 'Extract css from global styles onto css files instead of js ones.'
  },
  {
    name: 'watch',
    type: Boolean,
    default: false,
    aliases: ['w'],
    description: 'Run build when files change.'
  },
  {
    name: 'output-hashing',
    type: String,
    values: ['none', 'all', 'media', 'bundles'],
    description: 'Define the output filename cache-busting hashing mode.',
    aliases: ['oh']
  },
  {
    name: 'poll',
    type: Number,
    default: pollDefault,
    description: 'Enable and define the file watching poll time period (milliseconds).'
  },
  {
    name: 'app',
    type: String,
    aliases: ['a'],
    description: 'Specifies app name or index to use.'
  },
  {
    name: 'delete-output-path',
    type: Boolean,
    default: true,
    aliases: ['dop'],
    description: 'Delete output path before build.'
  },
  {
    name: 'preserve-symlinks',
    type: Boolean,
    default: false,
    description: 'Do not use the real path when resolving modules.'
  },
  {
    name: 'extract-licenses',
    type: Boolean,
    default: true,
    description: 'Extract all licenses in a separate file, in the case of production builds only.'
  }
];

export function getDefaultBuildOptions(): BuildOptions {
    // let buildOptions: BuildOptions = {};
    let buildOptions: any = {};
    baseBuildCommandOptions.map((it: any) => {
        let name = it.name.replace(/-(\w)/g, (all: any, letter: any) => {
            return letter.toUpperCase();
        });
        buildOptions[name] = it.default;
    });
    return buildOptions;
}