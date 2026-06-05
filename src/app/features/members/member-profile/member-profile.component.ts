import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Member, Payment, ActiveMembership } from '../../../shared/models';

@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss',
})
export class MemberProfileComponent implements OnInit {

  activeTab = signal<'overview' | 'payments' | 'notes'>('overview');
  memberId  = signal<number>(0);

  member = signal<Member | null>({
    id: 1, fullName: 'Khalid Ayyad', phone: '+962 79 123 4567',
    email: 'khalid@email.com', dateOfBirth: '1995-04-12', gender: 'male',
    sportId: 1, sport: { id:1, name:'BJJ', status:'active' },
    status: 'active', createdAt: '2024-01-10',
    notes: 'Very dedicated member. Trains 4 times a week. Interested in competition.',
  });

  membership = signal<ActiveMembership | null>({
    id: 1, memberId: 1, planId: 1,
    plan: { id:1, name:'Monthly', duration:'monthly', daysCount:30, price:45, status:'active' },
    startDate: '2026-05-01', endDate: '2026-06-01', daysLeft: 26,
    status: 'active', finalPrice: 45,
  });

  payments = signal<Payment[]>([
    { id:1, invoiceNumber:'INV-1042', memberId:1, planName:'Monthly', amount:45, discount:0, finalAmount:45, method:'cash',     status:'paid', paidAt:'2026-05-01' },
    { id:2, invoiceNumber:'INV-0998', memberId:1, planName:'Monthly', amount:45, discount:0, finalAmount:45, method:'card',     status:'paid', paidAt:'2026-04-01' },
    { id:3, invoiceNumber:'INV-0954', memberId:1, planName:'Monthly', amount:45, discount:0, finalAmount:45, method:'cash',     status:'paid', paidAt:'2026-03-01' },
    { id:4, invoiceNumber:'INV-0901', memberId:1, planName:'Monthly', amount:45, discount:0, finalAmount:45, method:'transfer', status:'paid', paidAt:'2026-02-01' },
  ]);

  totalPaid  = computed(() => this.payments().reduce((s,p) => s + p.finalAmount, 0));
  memberSince = computed(() => {
    const d = new Date(this.member()?.createdAt ?? '');
    return d.toLocaleDateString('en-GB', { month:'long', year:'numeric' });
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.memberId.set(id);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = ['#C8392B','#185FA5','#3B6D11','#854F0B','#533AB7','#0F6E56'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  getDaysPercent(days: number): number {
    return Math.min(Math.round((days / 30) * 100), 100);
  }

  getMethodIcon(method: string): string {
    if (method === 'card')     return 'credit_card';
    if (method === 'transfer') return 'account_balance';
    return 'payments';
  }

  goBack(): void {
    this.router.navigate(['/members']);
  }
}

