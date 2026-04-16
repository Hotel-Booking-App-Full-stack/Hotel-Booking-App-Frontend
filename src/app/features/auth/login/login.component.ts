import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  form: FormGroup;
  loading = false; error = '';
  returnUrl = '/hotels';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) { this.returnUrl = returnUrl; }

    // Redirect if already logged in
    if (auth.isLoggedIn()) {
      router.navigateByUrl(auth.isAdmin() ? '/admin' : this.returnUrl);
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.auth.login(this.form.value).subscribe({
      next: res => {
        if (res.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: err => { this.error = err.error?.message || 'Invalid credentials.'; this.loading = false; }
    });
  }

  get f() { return this.form.controls; }
}