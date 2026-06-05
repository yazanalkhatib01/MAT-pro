import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Payment {
  id: number; invoiceNumber: string; memberName: string; planName: string;
  amount: number; method: 'cash' | 'card' | 'transfer'; status: 'paid' | 'pending' | 'refunded'; paidAt: string;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {

  searchQuery  = signal('');
  activeFilter = signal('all');

  filters = [
    { label: 'All',      value: 'all'      },
    { label: 'Paid',     value: 'paid'     },
    { label: 'Pending',  value: 'pending'  },
    { label: 'Refunded', value: 'refunded' },
  ];

  payments = signal<Payment[]>([
    { id:1,  invoiceNumber:'INV-1042', memberName:'Khalid Ayyad',    planName:'Monthly',   amount:45,  method:'cash',     status:'paid',    paidAt:'2026-05-25' },
    { id:2,  invoiceNumber:'INV-1041', memberName:'Sara Al-Najjar',  planName:'Quarterly', amount:120, method:'card',     status:'paid',    paidAt:'2026-05-24' },
    { id:3,  invoiceNumber:'INV-1040', memberName:'Malik Hassan',    planName:'Annual',    amount:380, method:'transfer', status:'paid',    paidAt:'2026-05-23' },
    { id:4,  invoiceNumber:'INV-1039', memberName:'Lara Qasim',      planName:'Monthly',   amount:45,  method:'cash',     status:'pending', paidAt:'2026-05-22' },
    { id:5,  invoiceNumber:'INV-1038', memberName:'Rana Khalil',     planName:'Monthly',   amount:45,  method:'card',     status:'paid',    paidAt:'2026-05-21' },
    { id:6,  invoiceNumber:'INV-1037', memberName:'Ahmad Zaki',      planName:'Quarterly', amount:120, method:'cash',     status:'paid',    paidAt:'2026-05-20' },
    { id:7,  invoiceNumber:'INV-1036', memberName:'Hana Saleh',      planName:'Monthly',   amount:45,  method:'card',     status:'pending', paidAt:'2026-05-19' },
    { id:8,  invoiceNumber:'INV-1035', memberName:'Omar Saeed',      planName:'Annual',    amount:380, method:'transfer', status:'paid',    paidAt:'2026-05-18' },
    { id:9,  invoiceNumber:'INV-1034', memberName:'Nour Hamdan',     planName:'Monthly',   amount:45,  method:'cash',     status:'refunded',paidAt:'2026-05-17' },
    { id:10, invoiceNumber:'INV-1033', memberName:'Yousef Al-Ali',   planName:'Quarterly', amount:120, method:'card',     status:'paid',    paidAt:'2026-05-16' },
  ]);

  filteredPayments = computed(() => {
    let list = this.payments();
    if (this.activeFilter() !== 'all') {
      list = list.filter(p => p.status === this.activeFilter());
    }
    if (this.searchQuery().trim()) {
      const q = this.searchQuery().toLowerCase();
      list = list.filter(p =>
        p.memberName.toLowerCase().includes(q) ||
        p.invoiceNumber.toLowerCase().includes(q)
      );
    }
    return list;
  });

  todayRevenue  = computed(() => this.payments().filter(p => p.status === 'paid' && p.paidAt === '2026-05-25').reduce((s,p) => s + p.amount, 0));
  todayCount    = computed(() => this.payments().filter(p => p.paidAt === '2026-05-25').length);
  monthRevenue  = computed(() => this.payments().filter(p => p.status === 'paid').reduce((s,p) => s + p.amount, 0));
  pendingAmount = computed(() => this.payments().filter(p => p.status === 'pending').reduce((s,p) => s + p.amount, 0));
  pendingCount  = computed(() => this.payments().filter(p => p.status === 'pending').length);

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  getAvatarColor(name: string): string {
    const colors = ['#C8392B','#185FA5','#3B6D11','#854F0B','#533AB7','#0F6E56'];
    return colors[name.charCodeAt(0) % colors.length];
  }
  getMethodIcon(method: string): string {
    if (method === 'card')     return 'credit_card';
    if (method === 'transfer') return 'account_balance';
    return 'payments';
  }
  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
