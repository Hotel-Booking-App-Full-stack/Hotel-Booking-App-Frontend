import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginDto, RegisterDto, UserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5079/api/auth';
  private TK = 'hp_token'; private UK = 'hp_user';
  private userSubject = new BehaviorSubject<AuthResponse | null>(this.stored());
  currentUser$ = this.userSubject.asObservable();
  private timer: any;

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) this.startTimer();
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, dto).pipe(
      tap(r => { this.store(r); this.startTimer(); })
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, dto).pipe(
      tap(r => { this.store(r); this.startTimer(); })
    );
  }

  verifyEmail(token: string, email: string): Observable<any> {
    return this.http.post(`${this.api}/verify-email`, { token, email });
  }

  resendVerification(email: string): Observable<any> {
    return this.http.post(`${this.api}/resend-verification`,
      JSON.stringify(email), { headers: { 'Content-Type': 'application/json' } });
  }

  logout(reason = 'manual'): void {
    console.log(`[SESSION] Logout: ${new Date().toLocaleTimeString()} (${reason})`);
    localStorage.removeItem(this.TK); localStorage.removeItem(this.UK);
    this.userSubject.next(null); this.clearTimer();
    this.router.navigate(['/login']);
  }

  private startTimer(): void {
    this.clearTimer();
    const ms = 7 * 60 * 1000;
    console.log(`[SESSION] Expires: ${new Date(Date.now() + ms).toLocaleTimeString()}`);
    this.timer = setTimeout(() => {
      console.log(`[SESSION] Auto-logout: ${new Date().toLocaleTimeString()}`);
      this.logout('session_expired');
      alert('Session expired. Please log in again.');
    }, ms);
  }

  private clearTimer(): void { if (this.timer) { clearTimeout(this.timer); this.timer = null; } }
  private store(r: AuthResponse): void {
    localStorage.setItem(this.TK, r.token);
    localStorage.setItem(this.UK, JSON.stringify(r));
    this.userSubject.next(r);
  }
  private stored(): AuthResponse | null {
    const s = localStorage.getItem(this.UK); return s ? JSON.parse(s) : null;
  }
  getToken = (): string | null => localStorage.getItem(this.TK);
  isLoggedIn = (): boolean => !!this.getToken();
  isAdmin = (): boolean => this.userSubject.value?.role === 'Admin';
  getUser = (): AuthResponse | null => this.userSubject.value;

  getUsers(): Observable<UserDto[]> { return this.http.get<UserDto[]>(`${this.api}/users`); }
  deleteUser(id: number): Observable<any> { return this.http.delete(`${this.api}/users/${id}`); }
  toggleUser(id: number): Observable<any> { return this.http.patch(`${this.api}/users/${id}/toggle`, {}); }
}