import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { AuthResponse } from '../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: AuthResponse | null = null;
  showBack = false;
  profileOpen = false;
  menuOpen = false;

  // Pages where back button should NOT show
  private noBackRoutes = ['/hotels', '/login', '/register', '/admin'];

  constructor(
    public auth: AuthService,
    private router: Router,
    private location: Location
  ) {
    auth.currentUser$.subscribe(u => this.user = u);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects;
        // Show back only on detail/booking pages, not on main list pages
        this.showBack = !this.noBackRoutes.some(r => url === r || url === r + '/');
      });
  }

  goBack(): void {
    this.location.back();
    this.profileOpen = false;
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.profileOpen = false;
    }
  }

  toggleProfileMenu(): void {
    this.profileOpen = !this.profileOpen;
    if (this.profileOpen) {
      this.menuOpen = false;
    }
  }

  logout(): void {
    this.profileOpen = false;
    this.menuOpen = false;
    this.auth.logout();
  }
}