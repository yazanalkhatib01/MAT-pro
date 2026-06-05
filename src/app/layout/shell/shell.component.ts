import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { TopbarComponent }  from '../../shared/components/topbar/topbar.component';
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="shell">
      <app-sidebar />
      <div class="shell__content">
        <app-topbar />
        <main class="shell__main"><router-outlet /></main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display:flex; height:100vh; overflow:hidden; }
    .shell__content { flex:1; display:flex; flex-direction:column; min-width:0; overflow:hidden; }
    .shell__main { flex:1; overflow-y:auto; }
  `],
})
export class ShellComponent {}
