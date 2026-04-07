import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html'
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  timeLeft = 7 * 60;
  progressWidth = 100;
  showWarning = false;
  isLoggedIn = false;
  minutes = 7;
  seconds = 0;

  private interval: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.resetTimer();
      } else {
        this.clearTimer();
      }
    });
  }

  private resetTimer() {
    this.clearTimer();
    this.timeLeft = 7 * 60;
    this.progressWidth = 100;
    this.showWarning = false;
    this.updateDisplay();

    this.interval = setInterval(() => {
      this.timeLeft--;
      this.progressWidth = (this.timeLeft / (7 * 60)) * 100;
      this.updateDisplay();
      this.showWarning = this.timeLeft <= 60;

      if (this.timeLeft <= 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  private updateDisplay() {
    this.minutes = Math.floor(this.timeLeft / 60);
    this.seconds = this.timeLeft % 60;
  }

  private clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  padZero(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}