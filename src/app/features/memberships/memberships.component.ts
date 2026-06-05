import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.scss',
})
export class MembershipsComponent {

  activeTab  = signal<'plans' | 'active'>('plans');
  showDialog = signal(false);
  editingPlan = signal<Plan | null>(null);

  planForm = {
    name: '', duration: '', daysCount: 0, price: 0,
  };

  durationOptions = [
    { label: '1 Month',   value: '1 Month',   days: 30  },
    { label: '3 Months',  value: '3 Months',  days: 90  },
    { label: '6 Months',  value: '6 Months',  days: 180 },
    { label: '12 Months', value: '12 Months', days: 365 },
    { label: 'Custom',    value: 'Custom',    days: 0   },
  ];

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
    this.activeMemberships().filter(m => m.status !== 'expired').reduce((s,m) => s + m.price, 0)
  );

  expiringCount = computed(() =>
    this.activeMemberships().filter(m => m.status === 'expiring').length
  );

  openNewPlan(): void {
    this.editingPlan.set(null);
    this.planForm = { name:'', duration:'', daysCount:0, price:0 };
    this.showDialog.set(true);
  }

  openEditPlan(plan: Plan): void {
    this.editingPlan.set(plan);
    this.planForm = { name:plan.name, duration:plan.duration, daysCount:plan.daysCount, price:plan.price };
    this.showDialog.set(true);
  }

  onDurationChange(): void {
    const found = this.durationOptions.find(d => d.value === this.planForm.duration);
    if (found && found.days > 0) {
      this.planForm.daysCount = found.days;
    }
  }

  savePlan(): void {
    if (!this.planForm.name.trim() || !this.planForm.price) return;

    const editing = this.editingPlan();
    if (editing) {
      this.plans.update(list =>
        list.map(p => p.id === editing.id
          ? { ...p, name:this.planForm.name, duration:this.planForm.duration, daysCount:this.planForm.daysCount, price:this.planForm.price }
          : p
        )
      );
    } else {
      const newPlan: Plan = {
        id:          this.plans().length + 1,
        name:        this.planForm.name,
        duration:    this.planForm.duration,
        daysCount:   this.planForm.daysCount,
        price:       this.planForm.price,
        status:      'active',
        memberCount: 0,
      };
      this.plans.update(list => [...list, newPlan]);
    }
    this.showDialog.set(false);
  }

  togglePlanStatus(plan: Plan): void {
    this.plans.update(list =>
      list.map(p => p.id === plan.id
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
      )
    );
  }

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
}
