import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginDto, RegisterDto, UserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5079/api/auth';
  private tokenKey = 'hotel_token';
  private userKey = 'hotel_user';

  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  private sessionTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.startSessionTimer();
    }
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey, JSON.stringify(res));
        this.currentUserSubject.next(res);
        this.startSessionTimer();
      })
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey, JSON.stringify(res));
        this.currentUserSubject.next(res);
        this.startSessionTimer();
      })
    );
  }

  logout(reason: string = 'manual'): void {
    const logoutTime = new Date();
    console.log(`[SESSION] Logout at: ${logoutTime.toLocaleTimeString()} | Reason: ${reason}`);

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.clearSessionTimer();
    this.router.navigate(['/login']);
  }

  private startSessionTimer(): void {
    this.clearSessionTimer();
    const SEVEN_MINUTES = 7 * 60 * 1000;
    const loginTime = new Date();
    const logoutTime = new Date(loginTime.getTime() + SEVEN_MINUTES);

    console.log(`[SESSION] Started at: ${loginTime.toLocaleTimeString()}`);
    console.log(`[SESSION] Will expire at: ${logoutTime.toLocaleTimeString()}`);

    this.sessionTimer = setTimeout(() => {
      console.log(`[SESSION] Auto-logout triggered at: ${new Date().toLocaleTimeString()}`);
      this.logout('session_expired');
      alert('Your session has expired. Please log in again.');
    }, SEVEN_MINUTES);
  }

  private clearSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  resetSessionTimer(): void {
    if (this.isLoggedIn()) {
      this.startSessionTimer();
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'Admin';
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  private getStoredUser(): AuthResponse | null {
    const stored = localStorage.getItem(this.userKey);
    return stored ? JSON.parse(stored) : null;
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}