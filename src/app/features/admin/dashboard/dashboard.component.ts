import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { RoomService } from '../../../core/services/room.service';
import { AdminRoomStats } from '../../../core/models/room.model';

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  stats = { hotels: 0, bookings: 0, users: 0, revenue: 0, confirmed: 0, cancelled: 0 };
  roomStats: AdminRoomStats | null = null;
  loading = true;

  constructor(private hotelSvc: HotelService, private bookingSvc: BookingService,
    private authSvc: AuthService, private roomSvc: RoomService) {}

  ngOnInit() {
    Promise.all([
      this.hotelSvc.getAll().toPromise(),
      this.bookingSvc.getAllBookings().toPromise(),
      this.authSvc.getUsers().toPromise(),
      this.roomSvc.getAdminStats().toPromise()
    ]).then(([hotels, bookings, users, rs]) => {
      this.stats.hotels = hotels?.length || 0;
      this.stats.bookings = bookings?.length || 0;
      this.stats.users = users?.length || 0;
      this.stats.revenue = bookings?.reduce((s, b) => s + b.totalAmount, 0) || 0;
      this.stats.confirmed = bookings?.filter(b => b.status === 'Confirmed').length || 0;
      this.stats.cancelled = bookings?.filter(b => b.status === 'Cancelled').length || 0;
      this.roomStats = rs || null;
      this.loading = false;
    });
  }
}