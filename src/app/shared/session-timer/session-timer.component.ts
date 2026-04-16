import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-session-timer', templateUrl: './session-timer.component.html' })
export class SessionTimerComponent implements OnInit, OnDestroy {
  timeLeft = 7 * 60; progress = 100;
  showWarning = false; loggedIn = false;
  min = 7; sec = 0;
  private iv: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => {
      this.loggedIn = !!u;
      if (u) this.reset(); else this.clear();
    });
  }

  private reset() {
    this.clear();
    this.timeLeft = 7 * 60; this.progress = 100;
    this.showWarning = false; this.update();
    this.iv = setInterval(() => {
      this.timeLeft--;
      this.progress = (this.timeLeft / (7 * 60)) * 100;
      this.showWarning = this.timeLeft <= 60;
      this.update();
      if (this.timeLeft <= 0) this.clear();
    }, 1000);
  }

  private update() {
    this.min = Math.floor(this.timeLeft / 60);
    this.sec = this.timeLeft % 60;
  }

  private clear() { if (this.iv) { clearInterval(this.iv); this.iv = null; } }
  ngOnDestroy() { this.clear(); }
  pad(n: number) { return n < 10 ? '0' + n : '' + n; }
}