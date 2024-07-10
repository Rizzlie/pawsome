export interface FeatureGeneratorSchema {
  name: string;
  app: 'client' | 'admin';
  libTypes: LibType[];
}

export type LibType = 'data-access' | 'ui' | 'utils';
export type LibTypeWithShell = LibType | 'feature-shell';
