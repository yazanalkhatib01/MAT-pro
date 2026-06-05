import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User { id:number; name:string; role:string; initials:string; color:string; }

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  users = signal<User[]>([
    { id:1, name:'Ali Hassan',    role:'Owner',     initials:'AH', color:'#C8392B' },
    { id:2, name:'Nadia Mahmoud', role:'Reception', initials:'NM', color:'#3B6D11' },
    { id:3, name:'Karim Salah',   role:'Admin',     initials:'KS', color:'#185FA5' },
  ]);
}
