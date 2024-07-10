export interface FeatureGeneratorSchema {
  name: string;
  app: 'client' | 'admin';
  libTypes: ('data-access' | 'ui' | 'utils')[];
}
