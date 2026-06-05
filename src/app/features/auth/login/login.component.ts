import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  form = { email: '', password: '', remember: false };
  errors: { email?: string; password?: string } = {};
  showPassword = signal(false);
  isLoading    = signal(false);
  loginError   = signal('');

  constructor(private router: Router) {}

  validate(): boolean {
    this.errors = {};
    if (!this.form.email.trim()) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.errors.email = 'Enter a valid email address';
    }
    if (!this.form.password) {
      this.errors.password = 'Password is required';
    } else if (this.form.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }
    return Object.keys(this.errors).length === 0;
  }

  onSubmit(): void {
    this.loginError.set('');
    if (!this.validate()) return;

    this.isLoading.set(true);

    // Mock login — replace with real API call
    setTimeout(() => {
      if (this.form.email === 'admin@matpro.com' && this.form.password === 'admin123') {
        const user = { id:1, name:'Ali Hassan', email: this.form.email, role:'owner' };
        localStorage.setItem('mp_token', 'mock-token-12345');
        localStorage.setItem('mp_user',  JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set('Invalid email or password. Try admin@matpro.com / admin123');
      }
      this.isLoading.set(false);
    }, 800);
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
