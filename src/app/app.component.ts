import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-session-timer></app-session-timer>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 140px);
    }
  `]
})
export class AppComponent {}