import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu/:restaurantId',
    loadComponent: () =>
      import('./components/menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./components/error/error.component').then((m) => m.ErrorComponent),
  },
  {
    path: '',
    redirectTo: 'menu/alsham',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
