import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-verify-email', templateUrl: './verify-email.component.html' })
export class VerifyEmailComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';
    if (!token || !email) { this.status = 'error'; return; }
    this.auth.verifyEmail(token, email).subscribe({
      next: () => { this.status = 'success'; setTimeout(() => this.router.navigate(['/login']), 3000); },
      error: () => this.status = 'error'
    });
  }
}