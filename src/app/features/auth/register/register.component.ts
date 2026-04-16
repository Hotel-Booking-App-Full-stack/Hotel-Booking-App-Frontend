import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-register', templateUrl: './register.component.html' })
export class RegisterComponent {
  form: FormGroup;
  loading = false; error = ''; success = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.auth.register(this.form.value).subscribe({
      next: () => { this.success = true; setTimeout(() => this.router.navigate(['/hotels']), 3000); },
      error: err => { this.error = err.error?.message || 'Registration failed.'; this.loading = false; }
    });
  }

  get f() { return this.form.controls; }
}