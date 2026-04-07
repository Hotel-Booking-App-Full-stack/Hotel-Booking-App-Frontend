import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { RoomService } from '../../../core/services/room.service';
import { HotelService } from '../../../core/services/hotel.service';
import { Room } from '../../../core/models/room.model';
import { Hotel } from '../../../core/models/hotel.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent implements OnInit {
  form: FormGroup;
  room: Room | null = null;
  hotel: Hotel | null = null;
  loading = false;
  error = '';
  success = false;
  totalAmount = 0;
  nights = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    this.form = this.fb.group({
      checkInDate: [today, Validators.required],
      checkOutDate: [tomorrow, Validators.required],
      specialRequests: ['']
    });

    this.form.valueChanges.subscribe(() => this.calculateTotal());
  }

  ngOnInit() {
    const hotelId = +this.route.snapshot.paramMap.get('id')!;
    const roomId = +this.route.snapshot.paramMap.get('roomId')!;

    this.roomService.getById(roomId).subscribe(r => {
      this.room = r;
      this.calculateTotal();
    });
    this.hotelService.getById(hotelId).subscribe(h => this.hotel = h);
  }

  calculateTotal() {
    if (!this.room) return;
    const ci = new Date(this.form.value.checkInDate);
    const co = new Date(this.form.value.checkOutDate);
    this.nights = Math.max(0, Math.floor((co.getTime() - ci.getTime()) / 86400000));
    this.totalAmount = this.nights * this.room.pricePerNight;
  }

  submit() {
    if (this.form.invalid || this.nights <= 0) return;
    this.loading = true;
    this.error = '';

    const dto = {
      roomId: this.room!.id,
      hotelId: this.hotel!.id,
      checkInDate: this.form.value.checkInDate,
      checkOutDate: this.form.value.checkOutDate,
      specialRequests: this.form.value.specialRequests
    };

    this.bookingService.create(dto).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/my-bookings']), 2000);
      },
      error: err => {
        this.error = err.error?.message || 'Booking failed.';
        this.loading = false;
      }
    });
  }
}