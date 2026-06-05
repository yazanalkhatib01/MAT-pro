import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plan {
  id: number; name: string; duration: string; daysCount: number;
  price: number; status: 'active' | 'inactive'; memberCount: number;
}

interface ActiveMembership {
  id: number; memberName: string; sport: string; planName: string;
  startDate: string; endDate: string; daysLeft: number;
  status: 'active' | 'expiring' | 'expired'; price: number;
}

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.scss',
})
export class MembershipsComponent {

  activeTab = signal<'plans' | 'active'>('plans');

  plans = signal<Plan[]>([
    { id:1, name:'Monthly',     duration:'1 Month',   daysCount:30,  price:45,  status:'active', memberCount:58 },
    { id:2, name:'Quarterly',   duration:'3 Months',  daysCount:90,  price:120, status:'active', memberCount:34 },
    { id:3, name:'Semi-Annual', duration:'6 Months',  daysCount:180, price:210, status:'active', memberCount:18 },
    { id:4, name:'Annual',      duration:'12 Months', daysCount:365, price:380, status:'active', memberCount:12 },
  ]);

  activeMemberships = signal<ActiveMembership[]>([
    { id:1, memberName:'Khalid Ayyad',   sport:'BJJ',       planName:'Monthly',   startDate:'2026-05-01', endDate:'2026-06-01', daysLeft:26,  status:'active',   price:45  },
    { id:2, memberName:'Sara Al-Najjar', sport:'Muay Thai', planName:'Quarterly', startDate:'2026-03-15', endDate:'2026-06-15', daysLeft:10,  status:'expiring', price:120 },
    { id:3, memberName:'Malik Hassan',   sport:'Boxing',    planName:'Annual',    startDate:'2026-01-01', endDate:'2027-01-01', daysLeft:210, status:'active',   price:380 },
    { id:4, memberName:'Lara Qasim',     sport:'MMA',       planName:'Monthly',   startDate:'2026-05-01', endDate:'2026-06-01', daysLeft:2,   status:'expiring', price:45  },
    { id:5, memberName:'Rana Khalil',    sport:'Taekwondo', planName:'Monthly',   startDate:'2026-04-01', endDate:'2026-05-01', daysLeft:0,   status:'expired',  price:45  },
  ]);

  totalActiveRevenue = computed(() =>
    this.activeMemberships()
      .filter(m => m.status !== 'expired')
      .reduce((s, m) => s + m.price, 0)
  );

  expiringCount = computed(() =>
    this.activeMemberships().filter(m => m.status === 'expiring').length
  );

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = ['#C8392B','#185FA5','#3B6D11','#854F0B','#533AB7','#0F6E56'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  getDaysBarWidth(days: number): number {
    return Math.min(Math.round((days / 365) * 100), 100);
  }

  getDaysBarColor(status: string): string {
    if (status === 'expired')  return '#E24B4A';
    if (status === 'expiring') return '#EF9F27';
    return '#639922';
  }

  togglePlanStatus(plan: Plan): void {
    this.plans.update(plans =>
      plans.map(p => p.id === plan.id
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
      )
    );
  }
}
