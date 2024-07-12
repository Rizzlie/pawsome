import { Route } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';

export const featureShellRoutes: Route[] = [
  {
    path: '',
    component: FeatureShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/homepage/homepage.component').then(
            (m) => m.HomepageComponent
          ),
      },
    ],
  },
];
