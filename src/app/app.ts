import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/patients" routerLinkActive="active">Patients</a>
      <a routerLink="/doctors" routerLinkActive="active">Doctors</a>
      <a routerLink="/appointments" routerLinkActive="active">Appointments</a>
      <a routerLink="/prescriptions" routerLinkActive="active">Prescriptions</a>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .nav { display:flex; gap:12px; padding:14px 18px; border-bottom:1px solid #eee; }
    .nav a { text-decoration:none; color:#333; padding:6px 10px; border-radius:8px; }
    .nav a.active { background:#f2f2f2; }
    .container { padding: 18px; }
  `]
})
export class App {}
