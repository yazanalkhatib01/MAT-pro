import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  id: number; name: string; email: string; role: 'owner' | 'admin' | 'reception';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AuthUser | null>(this.loadUser());

  isAuthenticated  = computed(() => this.currentUser() !== null);
  userRole         = computed(() => this.currentUser()?.role);
  userInitials     = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  });
  canManageMembers = computed(() =>
    ['owner', 'admin'].includes(this.currentUser()?.role ?? '')
  );

  constructor(private router: Router) {}

  isLoggedIn(): boolean { return true; }

  logout() {
    localStorage.removeItem('mp_token');
    localStorage.removeItem('mp_user');
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem('mp_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
