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

export async function createDataAccessLibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const fullName = `${schema.app} Domains ${schema.name} Data-Access`;
  const { fileName: libraryName } = names(fullName);

  await libraryGenerator(tree, {
    name: libraryName,
    prefix: 'pawsome',
    directory: `./libs/${schema.app}/domains/${schema.name}/data-access`,
    standalone: false,
    skipModule: true,
    projectNameAndRootFormat: 'as-provided',
    tags: 'scope:data-access',
    style: 'scss',
    importPath: `@pawsome/${schema.app}/domains/${schema.name}/data-access`,
  });

  const project = readProjectConfiguration(tree, libraryName);

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
