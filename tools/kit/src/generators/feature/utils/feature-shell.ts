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

export async function createFeatureShellLibrary(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const { className } = featureShellNames();

  const fullName = `${schema.app} Domains ${schema.name} ${className}`;
  const { fileName: libraryName } = names(fullName);

  await libraryGenerator(tree, {
    name: libraryName,
    directory: `./libs/${schema.app}/domains/${schema.name}/feature-shell`,
    standalone: false,
    skipModule: true,
    flat: true,
    prefix: 'pawsome',
    projectNameAndRootFormat: 'as-provided',
    tags: 'scope:feature-shell',
    style: 'scss',
    importPath: `@pawsome/${schema.app}/domains/${schema.name}/feature-shell`,
  });

  const project = readProjectConfiguration(tree, libraryName);

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
    `${sourceRoot}/lib`,
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
  return `pawsome-${names(`${schema.name} Feature Shell`).fileName}`;
}
