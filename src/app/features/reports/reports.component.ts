import { Component, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

interface RevenueMonth { month: string; amount: number; isCurrentMonth: boolean; }
interface SportStat    { name: string; count: number; color: string; }
interface PlanStat     { name: string; count: number; }

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {

  activeTab = signal<'revenue' | 'members' | 'memberships'>('revenue');

  revenueData = signal<RevenueMonth[]>([
    { month:'Jan', amount:3520, isCurrentMonth:false },
    { month:'Feb', amount:3380, isCurrentMonth:false },
    { month:'Mar', amount:3760, isCurrentMonth:false },
    { month:'Apr', amount:3810, isCurrentMonth:false },
    { month:'May', amount:4280, isCurrentMonth:true  },
    { month:'Jun', amount:0,    isCurrentMonth:false },
  ]);

  sportStats = signal<SportStat[]>([
    { name:'Brazilian Jiu-Jitsu', count:38, color:'#C8392B' },
    { name:'Boxing',              count:24, color:'#185FA5' },
    { name:'Muay Thai',           count:19, color:'#3B6D11' },
    { name:'MMA',                 count:17, color:'#854F0B' },
    { name:'Taekwondo',           count:12, color:'#533AB7' },
    { name:'Wrestling',           count:8,  color:'#0F6E56' },
  ]);

  planStats = signal<PlanStat[]>([
    { name:'Monthly',     count:68 },
    { name:'Quarterly',   count:34 },
    { name:'Semi-Annual', count:22 },
    { name:'Annual',      count:18 },
  ]);

  maxRevenue  = computed(() => Math.max(...this.revenueData().map(r => r.amount)));
  maxSport    = computed(() => Math.max(...this.sportStats().map(s => s.count)));
  maxPlan     = computed(() => Math.max(...this.planStats().map(p => p.count)));

  getBarPercent(amount: number):  number { return amount === 0 ? 0 : Math.round((amount / this.maxRevenue()) * 100); }
  getSportPercent(count: number): number { return Math.round((count / this.maxSport()) * 100); }
  getPlanPercent(count: number):  number { return Math.round((count / this.maxPlan()) * 100); }
}
