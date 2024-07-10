import { formatFiles, Tree } from '@nx/devkit';
import { FeatureGeneratorSchema } from './schema';
import { createFeatureShellLibrary } from './utils/feature-shell';

export async function featureGenerator(
  tree: Tree,
  options: FeatureGeneratorSchema
) {
  await createFeatureShellLibrary(tree, options);

  if (options.libTypes.includes('ui')) {
    // await createUILibrary(tree, options);
  }

  if (options.libTypes.includes('data-access')) {
    // await createDataAccessLibrary(tree, options);
  }

  if (options.libTypes.includes('utils')) {
    // await createUtilsLibrary(tree, options);
  }

  await formatFiles(tree);
}

export default featureGenerator;
