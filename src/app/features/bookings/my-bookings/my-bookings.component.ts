import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({ selector: 'app-my-bookings', templateUrl: './my-bookings.component.html' })
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = []; loading = true; cancelling: number | null = null;

  constructor(private svc: BookingService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getMyBookings().subscribe({
      next: b => { this.bookings = b; this.loading = false; },
      error: () => this.loading = false
    });
  }

  cancel(id: number) {
    if (!confirm('Cancel this booking?')) return;
    this.cancelling = id;
    this.svc.cancel(id).subscribe({
      next: () => { this.cancelling = null; this.load(); },
      error: () => this.cancelling = null
    });
  }

  nights(b: Booking) {
    return Math.floor((new Date(b.checkOutDate).getTime() - new Date(b.checkInDate).getTime()) / 86400000);
  }
}