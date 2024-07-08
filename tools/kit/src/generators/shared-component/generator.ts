import { componentGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { join } from 'path';
import { SharedComponentGeneratorSchema } from './schema';
export async function sharedComponentGenerator(
  tree: Tree,
  options: SharedComponentGeneratorSchema
) {
  const sharedLib = readProjectConfiguration(tree, 'client-shared');
  const sharedComponentsDirectory = `${sharedLib.sourceRoot}/components`;

  await componentGenerator(tree, {
    name: options.name,
    directory: `${sharedComponentsDirectory}/${options.name}`,
    standalone: true,
    flat: true,
    style: 'scss',
    changeDetection: 'OnPush',
    prefix: 'pawsome',
  });

  generateFiles(
    tree,
    join(__dirname, 'files'),
    `${sharedComponentsDirectory}/${options.name}`,
    {
      componentFileName: `${names(options.name).fileName}.component`,
      componentClassName: `${names(options.name).className}Component`,
      componentName: names(options.name).className,
      name: names(options.name).fileName,
    }
  );

  await formatFiles(tree);
}

export default sharedComponentGenerator;
