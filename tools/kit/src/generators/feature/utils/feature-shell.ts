import { componentGenerator, libraryGenerator } from '@nx/angular/generators';
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

export async function createFeatureShellLibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const config = libraryConfig(schema, 'feature-shell');

  await libraryGenerator(tree, {
    ...defaultLibraryConfig,
    ...config,
    flat: true,
  });

  const project = readProjectConfiguration(tree, config.name);

  await addComponent(tree, schema, project.sourceRoot);
  addRouting(tree, schema, project.sourceRoot);
}

async function addComponent(
  tree: Tree,
  schema: FeatureGeneratorSchema,
  sourceRoot: string
) {
  const { fileName } = featureShellNames();
  const selector = getSelector(schema);

  await componentGenerator(tree, {
    name: fileName,
    directory: `${sourceRoot}/lib`,
    standalone: true,
    selector,
    style: 'scss',
    changeDetection: 'OnPush',
    nameAndDirectoryFormat: 'as-provided',
  });
}

function addRouting(
  tree: Tree,
  schema: FeatureGeneratorSchema,
  sourceRoot: string
) {
  const { className, fileName, propertyName } = featureShellNames();
  const selector = getSelector(schema);

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'feature-shell'),
    sourceRoot,
    {
      libClassName: className,
      pathToComponent: fileName,
      libPropertyName: propertyName,
      componentSelector: selector,
    },
    {
      overwriteStrategy: OverwriteStrategy.Overwrite,
    }
  );
}

function featureShellNames() {
  return names('Feature Shell');
}

function getSelector(schema: FeatureGeneratorSchema) {
  return `${defaultLibraryConfig.prefix}-${
    names(`${schema.name} Feature Shell`).fileName
  }`;
}
