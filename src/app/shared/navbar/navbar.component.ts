import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AuthResponse } from '../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  currentUser: AuthResponse | null = null;

  constructor(public auth: AuthService) {
    auth.currentUser$.subscribe(user => this.currentUser = user);
  }

  logout() { this.auth.logout('manual'); }
}