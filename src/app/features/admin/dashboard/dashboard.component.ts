import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = { hotels: 0, bookings: 0, users: 0, revenue: 0, confirmed: 0, cancelled: 0 };
  loading = true;

  constructor(
    private hotelService: HotelService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    Promise.all([
      this.hotelService.getAll().toPromise(),
      this.bookingService.getAllBookings().toPromise(),
      this.authService.getAllUsers().toPromise()
    ]).then(([hotels, bookings, users]) => {
      this.stats.hotels = hotels?.length || 0;
      this.stats.bookings = bookings?.length || 0;
      this.stats.users = users?.length || 0;
      this.stats.revenue = bookings?.reduce((s, b) => s + b.totalAmount, 0) || 0;
      this.stats.confirmed = bookings?.filter(b => b.status === 'Confirmed').length || 0;
      this.stats.cancelled = bookings?.filter(b => b.status === 'Cancelled').length || 0;
      this.loading = false;
    });
  }
}