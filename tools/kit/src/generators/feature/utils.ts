import { names } from '@nx/devkit';
import { FeatureGeneratorSchema, LibTypeWithShell } from './schema';

const defaultConfig = {
  prefix: 'pawsome',
};

const libraryTypeConfig: {
  [key in LibTypeWithShell]: { directory: string; scope: string };
} = {
  'data-access': {
    directory: 'data-access',
    scope: 'data-access',
  },
  ui: {
    directory: 'ui',
    scope: 'ui',
  },
  utils: {
    directory: 'utils',
    scope: 'utils',
  },
  'feature-shell': {
    directory: 'feature-shell',
    scope: 'feature-shell',
  },
};

export const defaultLibraryConfig = {
  prefix: defaultConfig.prefix,
  style: 'scss',
  standalone: false,
  skipModule: true,
  projectNameAndRootFormat: 'as-provided',
} as const;

export function libraryConfig(
  schema: FeatureGeneratorSchema,
  libraryType: LibTypeWithShell
) {
  const fullName = `${schema.app} Domains ${schema.name} ${libraryType}`;
  const { fileName: libraryName } = names(fullName);

  const { directory, scope } = libraryTypeConfig[libraryType];

  return {
    name: libraryName,
    directory: `./libs/${schema.app}/domains/${schema.name}/${directory}`,
    tags: `scope:${scope}`,
    importPath: `@${defaultConfig.prefix}/${schema.app}/domains/${schema.name}/${directory}`,
  } as const;
}
