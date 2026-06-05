import { Component } from '@angular/core';
@Component({
  selector: 'app-topbar',
  standalone: true,
  template: `
    <header class="topbar">
      <div class="topbar__search">
        <span class="material-icons">search</span>
        <input type="text" placeholder="Quick search..." />
      </div>
      <div class="topbar__spacer"></div>
      <span class="material-icons topbar__icon">notifications_none</span>
      <span class="material-icons topbar__icon">settings</span>
      <div class="topbar__avatar">AH</div>
    </header>
  `,
  styles: [`
    .topbar { height:var(--mp-topbar-height); background:var(--mp-bg-card); border-bottom:1px solid var(--mp-border); display:flex; align-items:center; padding:0 20px; gap:10px; flex-shrink:0; }
    .topbar__search { display:flex; align-items:center; gap:8px; width:260px; height:34px; background:var(--mp-bg-surface); border:1px solid var(--mp-border); border-radius:8px; padding:0 10px; }
    .topbar__search .material-icons { font-size:16px; color:var(--mp-text-muted); }
    .topbar__search input { border:none; background:transparent; font-size:13px; outline:none; width:100%; }
    .topbar__search input::placeholder { color:var(--mp-text-muted); }
    .topbar__spacer { flex:1; }
    .topbar__icon { font-size:20px; color:var(--mp-text-secondary); cursor:pointer; padding:6px; border-radius:6px; }
    .topbar__avatar { width:30px; height:30px; border-radius:50%; background:var(--mp-brand); color:#fff; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  `],
})
export class TopbarComponent {}
