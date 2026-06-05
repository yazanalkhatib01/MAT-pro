import { Routes } from '@angular/router';

export const membersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./members-list/members-list.component').then(m => m.MembersListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./member-profile/member-profile.component').then(m => m.MemberProfileComponent),
  },
];
