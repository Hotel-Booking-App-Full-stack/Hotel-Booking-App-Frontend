import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-admin-shell', templateUrl: './admin-shell.component.html' })
export class AdminShellComponent {
  sidebarOpen = true;
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); }
}