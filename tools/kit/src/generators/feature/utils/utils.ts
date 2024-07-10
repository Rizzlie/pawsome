import { libraryGenerator } from '@nx/angular/generators';
import {
  generateFiles,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { join } from 'path';
import { FeatureGeneratorSchema } from '../schema';

export async function createUtilsLibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const fullName = `${schema.app} Domains ${schema.name} Utils`;
  const { fileName: libraryName } = names(fullName);

  await libraryGenerator(tree, {
    name: libraryName,
    prefix: 'pawsome',
    directory: `./libs/${schema.app}/domains/${schema.name}/utils`,
    standalone: false,
    skipModule: true,
    projectNameAndRootFormat: 'as-provided',
    tags: 'scope:utils',
    style: 'scss',
    importPath: `@pawsome/${schema.app}/domains/${schema.name}/utils`,
  });

  const project = readProjectConfiguration(tree, libraryName);

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'utils'),
    project.sourceRoot,
    {}
  );
}
