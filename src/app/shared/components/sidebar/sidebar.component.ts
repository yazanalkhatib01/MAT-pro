import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navSections = [
    { label: 'Main', items: [
      { label: 'Dashboard',   icon: 'dashboard',           route: '/dashboard'   },
      { label: 'Members',     icon: 'group',               route: '/members'     },
      { label: 'Memberships', icon: 'card_membership',     route: '/memberships' },
    ]},
    { label: 'Finance', items: [
      { label: 'Payments',    icon: 'payments',            route: '/payments'    },
      { label: 'Reports',     icon: 'bar_chart',           route: '/reports'     },
    ]},
    { label: 'Config', items: [
      { label: 'Sports',      icon: 'sports_martial_arts', route: '/sports'      },
      { label: 'Offers',      icon: 'local_offer',         route: '/offers'      },
      { label: 'Settings',    icon: 'tune',                route: '/settings'    },
    ]},
  ];
}
