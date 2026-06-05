import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#F4F5F7">
      <div style="background:#fff;border-radius:12px;padding:40px;width:360px;text-align:center;border:1px solid rgba(0,0,0,0.08)">
        <div style="width:48px;height:48px;background:#C8392B;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <span style="color:#fff;font-size:22px;font-weight:700">M</span>
        </div>
        <h1 style="font-size:22px;margin:0 0 4px;font-family:sans-serif">MatPro</h1>
        <p style="color:#9898A8;font-size:13px;margin:0 0 24px">Club Management System</p>
        <a routerLink="/" style="display:block;background:#C8392B;color:#fff;padding:10px;border-radius:8px;text-decoration:none;font-weight:500">Enter Dashboard</a>
      </div>
    </div>
  `,
})
export class LoginComponent {}
