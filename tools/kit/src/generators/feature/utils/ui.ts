import { libraryGenerator } from '@nx/angular/generators';
import { generateFiles, readProjectConfiguration, Tree } from '@nx/devkit';
import { join } from 'path';
import { FeatureGeneratorSchema } from '../schema';
import { defaultLibraryConfig, libraryConfig } from '../utils';

export async function createUILibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const config = libraryConfig(schema, 'ui');

  await libraryGenerator(tree, {
    ...defaultLibraryConfig,
    ...config,
  });

  const project = readProjectConfiguration(tree, config.name);

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'ui'),
    project.sourceRoot,
    {}
  );
}
