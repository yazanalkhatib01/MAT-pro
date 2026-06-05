import { Component, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStats, Payment } from '../../shared/models';

interface ExpiringMember { name: string; sport: string; daysLeft: number; membershipId: number; }
interface MonthRevenue   { month: string; amount: number; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  stats = signal<DashboardStats>({
    totalMembers: 142, activeMembers: 118, expiringThisWeek: 14,
    expiredMembers: 24, monthlyRevenue: 4280, revenueGrowth: 12.3, todayRevenue: 245,
  });

  payments = signal<Payment[]>([
    { id:1, invoiceNumber:'INV-1042', memberId:1, planName:'Monthly',   amount:45,  discount:0, finalAmount:45,  method:'cash',     status:'paid',    paidAt:'2025-05-25', member:{ id:1, fullName:'Khalid Ayyad',   phone:'', gender:'male',   sportId:1, sport:{ id:1, name:'BJJ',       status:'active' }, status:'active',   createdAt:'' } },
    { id:2, invoiceNumber:'INV-1041', memberId:2, planName:'Quarterly', amount:120, discount:0, finalAmount:120, method:'card',     status:'paid',    paidAt:'2025-05-24', member:{ id:2, fullName:'Sara Al-Najjar', phone:'', gender:'female', sportId:3, sport:{ id:3, name:'Muay Thai', status:'active' }, status:'active',   createdAt:'' } },
    { id:3, invoiceNumber:'INV-1040', memberId:3, planName:'Annual',    amount:380, discount:0, finalAmount:380, method:'transfer', status:'paid',    paidAt:'2025-05-23', member:{ id:3, fullName:'Malik Hassan',   phone:'', gender:'male',   sportId:2, sport:{ id:2, name:'Boxing',    status:'active' }, status:'active',   createdAt:'' } },
    { id:4, invoiceNumber:'INV-1039', memberId:4, planName:'Monthly',   amount:45,  discount:0, finalAmount:45,  method:'cash',     status:'pending', paidAt:'2025-05-22', member:{ id:4, fullName:'Lara Qasim',     phone:'', gender:'female', sportId:4, sport:{ id:4, name:'MMA',       status:'active' }, status:'expiring', createdAt:'' } },
  ]);

  expiring = signal<ExpiringMember[]>([
    { name:'Rana Khalil', sport:'Taekwondo', daysLeft:1, membershipId:101 },
    { name:'Ahmad Zaki',  sport:'BJJ',       daysLeft:2, membershipId:102 },
    { name:'Hana Saleh',  sport:'Boxing',    daysLeft:5, membershipId:103 },
    { name:'Omar Saeed',  sport:'Wrestling', daysLeft:7, membershipId:104 },
  ]);

  revenue = signal<MonthRevenue[]>([
    { month:'Dec', amount:3100 }, { month:'Jan', amount:3520 },
    { month:'Feb', amount:3380 }, { month:'Mar', amount:3760 },
    { month:'Apr', amount:3810 }, { month:'May', amount:4280 },
  ]);

  maxRevenue = computed(() => Math.max(...this.revenue().map(r => r.amount)));

  getRevenuePercent(amount: number): number {
    return Math.round((amount / this.maxRevenue()) * 100);
  }
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  getAvatarColor(name: string): string {
    const colors = ['#C8392B','#185FA5','#3B6D11','#854F0B','#533AB7','#0F6E56'];
    return colors[name.charCodeAt(0) % colors.length];
  }
  getDaysClass(days: number): string { return days <= 2 ? 'urgent' : 'soon'; }
}
