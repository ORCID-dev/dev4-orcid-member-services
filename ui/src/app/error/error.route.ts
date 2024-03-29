import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoutes: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title.string'
    }
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title.string',
      error403: true
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title.string',
      error404: true
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
