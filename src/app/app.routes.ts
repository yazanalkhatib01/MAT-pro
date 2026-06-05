import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Auth (بدون layout)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },

  // App (مع Shell layout)
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard — MatPro',
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./features/members/members.routes').then((m) => m.membersRoutes),
        title: 'Members — MatPro',
      },
      {
        path: 'memberships',
        loadComponent: () =>
          import('./features/memberships/memberships.component').then(
            (m) => m.MembershipsComponent,
          ),
        title: 'Memberships — MatPro',
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./features/payments/payments.component').then((m) => m.PaymentsComponent),
        title: 'Payments — MatPro',
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then((m) => m.ReportsComponent),
        title: 'Reports — MatPro',
      },
      {
        path: 'sports',
        loadComponent: () =>
          import('./features/sports/sports.component').then((m) => m.SportsComponent),
        title: 'Sports — MatPro',
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./features/offers/offers.component').then((m) => m.OffersComponent),
        title: 'Offers — MatPro',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
        title: 'Settings — MatPro',
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
