import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Member } from '../../../shared/models';
import { MemberFormDialogComponent } from '../member-form-dialog/member-form-dialog.component';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, MemberFormDialogComponent, RouterLink],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent {

  showDialog  = signal(false);
  searchQuery = signal('');
  activeFilter = signal('all');

  filters = [
    { label: 'All',      value: 'all'      },
    { label: 'Active',   value: 'active'   },
    { label: 'Expiring', value: 'expiring' },
    { label: 'Expired',  value: 'expired'  },
  ];

  allMembers = signal<Member[]>([
    { id:1,  fullName:'Khalid Ayyad',    phone:'+962 79 123 4567', gender:'male',   sportId:1, sport:{ id:1, name:'BJJ',       status:'active' }, status:'active',   createdAt:'2024-01-10' },
    { id:2,  fullName:'Sara Al-Najjar',  phone:'+962 77 988 7654', gender:'female', sportId:3, sport:{ id:3, name:'Muay Thai', status:'active' }, status:'active',   createdAt:'2024-02-14' },
    { id:3,  fullName:'Malik Hassan',    phone:'+962 78 555 6699', gender:'male',   sportId:2, sport:{ id:2, name:'Boxing',    status:'active' }, status:'active',   createdAt:'2024-01-20' },
    { id:4,  fullName:'Lara Qasim',      phone:'+962 79 001 2233', gender:'female', sportId:4, sport:{ id:4, name:'MMA',       status:'active' }, status:'expiring', createdAt:'2024-03-05' },
    { id:5,  fullName:'Rana Khalil',     phone:'+962 77 441 0023', gender:'female', sportId:5, sport:{ id:5, name:'Taekwondo', status:'active' }, status:'expired',  createdAt:'2024-01-08' },
    { id:6,  fullName:'Ahmad Zaki',      phone:'+962 79 876 5432', gender:'male',   sportId:1, sport:{ id:1, name:'BJJ',       status:'active' }, status:'expiring', createdAt:'2024-04-12' },
    { id:7,  fullName:'Hana Saleh',      phone:'+962 78 222 3344', gender:'female', sportId:2, sport:{ id:2, name:'Boxing',    status:'active' }, status:'active',   createdAt:'2024-02-28' },
    { id:8,  fullName:'Omar Saeed',      phone:'+962 77 334 5566', gender:'male',   sportId:6, sport:{ id:6, name:'Wrestling', status:'active' }, status:'active',   createdAt:'2024-03-18' },
    { id:9,  fullName:'Nour Hamdan',     phone:'+962 79 445 6677', gender:'female', sportId:3, sport:{ id:3, name:'Muay Thai', status:'active' }, status:'active',   createdAt:'2024-04-01' },
    { id:10, fullName:'Yousef Al-Ali',   phone:'+962 78 556 7788', gender:'male',   sportId:4, sport:{ id:4, name:'MMA',       status:'active' }, status:'expired',  createdAt:'2024-01-15' },
  ]);

  filteredMembers = computed(() => {
    let list = this.allMembers();
    if (this.activeFilter() !== 'all') {
      list = list.filter(m => m.status === this.activeFilter());
    }
    if (this.searchQuery().trim()) {
      const q = this.searchQuery().toLowerCase();
      list = list.filter(m =>
        m.fullName.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.sport?.name.toLowerCase().includes(q)
      );
    }
    return list;
  });

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = ['#C8392B','#185FA5','#3B6D11','#854F0B','#533AB7','#0F6E56'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  setFilter(value: string): void { this.activeFilter.set(value); }
  onSearch(event: Event): void   { this.searchQuery.set((event.target as HTMLInputElement).value); }
  getStatusCount(status: string): number {
    if (status === 'all') return this.allMembers().length;
    return this.allMembers().filter(m => m.status === status).length;
  }

  onMemberSaved(form: any): void {
    const newMember: Member = {
      id:        this.allMembers().length + 1,
      fullName:  form.fullName,
      phone:     form.phone,
      email:     form.email,
      gender:    form.gender,
      sportId:   form.sportId,
      sport:     { id: form.sportId, name: this.getSportName(form.sportId), status: 'active' },
      status:    'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.allMembers.update(members => [...members, newMember]);
  }

  private getSportName(id: number): string {
    const sports: Record<number,string> = {1:'BJJ',2:'Boxing',3:'Muay Thai',4:'MMA',5:'Taekwondo',6:'Wrestling',7:'Karate'};
    return sports[id] ?? '';
  }
}

