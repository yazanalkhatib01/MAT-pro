import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Sport {
  id: number; name: string; memberCount: number; status: 'active' | 'inactive'; color: string;
}

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss',
})
export class SportsComponent {
  sports = signal<Sport[]>([
    { id:1, name:'Brazilian Jiu-Jitsu', memberCount:38, status:'active', color:'#C8392B' },
    { id:2, name:'Boxing',              memberCount:24, status:'active', color:'#185FA5' },
    { id:3, name:'Muay Thai',           memberCount:19, status:'active', color:'#3B6D11' },
    { id:4, name:'MMA',                 memberCount:17, status:'active', color:'#854F0B' },
    { id:5, name:'Taekwondo',           memberCount:12, status:'active', color:'#533AB7' },
    { id:6, name:'Wrestling',           memberCount:8,  status:'active', color:'#0F6E56' },
    { id:7, name:'Karate',              memberCount:0,  status:'inactive', color:'#888780' },
  ]);

  toggleStatus(sport: Sport): void {
    this.sports.update(list =>
      list.map(s => s.id === sport.id
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
      )
    );
  }
}
