import { libraryGenerator } from '@nx/angular/generators';
import {
  generateFiles,
  names,
  OverwriteStrategy,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { join } from 'path';
import { FeatureGeneratorSchema } from '../schema';
import { defaultLibraryConfig, libraryConfig } from '../utils';

export async function createDataAccessLibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const config = libraryConfig(schema, 'data-access');

  await libraryGenerator(tree, {
    ...defaultLibraryConfig,
    ...config,
  });

  const project = readProjectConfiguration(tree, config.name);

  addStore(tree, project.sourceRoot, schema);
}

function addStore(
  tree: Tree,
  sourceRoot: string,
  schema: FeatureGeneratorSchema
) {
  const { fileName, className, propertyName } = names(schema.name);

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'data-access'),
    sourceRoot,
    {
      libClassName: className,
      libFileName: fileName,
      libPropertyName: propertyName,
    },
    {
      overwriteStrategy: OverwriteStrategy.Overwrite,
    }
  );
}
