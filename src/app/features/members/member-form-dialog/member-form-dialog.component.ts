import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MemberForm {
  fullName: string; phone: string; email: string;
  dateOfBirth: string; gender: string; sportId: number | null; notes: string;
}

@Component({
  selector: 'app-member-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-form-dialog.component.html',
  styleUrl: './member-form-dialog.component.scss',
})
export class MemberFormDialogComponent {
  closed = output<void>();
  saved  = output<MemberForm>();

  isSubmitting = signal(false);

  sports = [
    { id:1, name:'BJJ' }, { id:2, name:'Boxing' }, { id:3, name:'Muay Thai' },
    { id:4, name:'MMA' }, { id:5, name:'Taekwondo' }, { id:6, name:'Wrestling' }, { id:7, name:'Karate' },
  ];

  form: MemberForm = { fullName:'', phone:'', email:'', dateOfBirth:'', gender:'', sportId:null, notes:'' };
  errors: Partial<Record<keyof MemberForm, string>> = {};

  validate(): boolean {
    this.errors = {};
    if (!this.form.fullName.trim()) this.errors.fullName = 'Full name is required';
    if (!this.form.phone.trim())    this.errors.phone    = 'Phone is required';
    if (!this.form.gender)          this.errors.gender   = 'Gender is required';
    if (!this.form.sportId)         this.errors.notes    = 'Sport is required';
    return Object.keys(this.errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) return;
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.saved.emit(this.form);
      this.isSubmitting.set(false);
      this.close();
    }, 600);
  }

  close(): void { this.closed.emit(); }
}
