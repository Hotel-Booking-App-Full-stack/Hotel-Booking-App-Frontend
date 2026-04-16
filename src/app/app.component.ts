import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar *ngIf="!isAdminRoute"></app-navbar>
    <app-session-timer></app-session-timer>
    <main class="hp-main">
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAdminRoute"></app-footer>
  `
})
export class AppComponent implements OnInit {
  isAdminRoute = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Track admin routes
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects;
        this.isAdminRoute = url?.startsWith('/admin');
      });

    // If admin is already logged in (page refresh), redirect to dashboard
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin']);
    }
  }
}