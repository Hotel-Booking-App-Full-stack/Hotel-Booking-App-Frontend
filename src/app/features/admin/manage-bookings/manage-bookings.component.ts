import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../core/models/booking.model';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html'
})
export class ManageBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  cancelling: number | null = null;
  filterStatus = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe(b => { this.bookings = b; this.loading = false; });
  }

  cancel(id: number) {
    if (!confirm('Cancel this booking?')) return;
    this.cancelling = id;
    this.bookingService.cancel(id).subscribe({
      next: () => { this.cancelling = null; this.load(); },
      error: () => this.cancelling = null
    });
  }

  get filtered(): Booking[] {
    return this.filterStatus ? this.bookings.filter(b => b.status === this.filterStatus) : this.bookings;
  }
}