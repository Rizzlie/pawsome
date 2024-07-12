import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@pawsome/client/domains/homepage/feature-shell').then(
        (m) => m.featureShellRoutes
      ),
  },
];
