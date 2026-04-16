import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { RoomService } from '../../../core/services/room.service';
import { HotelService } from '../../../core/services/hotel.service';
import { Room } from '../../../core/models/room.model';
import { Hotel } from '../../../core/models/hotel.model';

@Component({ selector: 'app-booking-form', templateUrl: './booking-form.component.html' })
export class BookingFormComponent implements OnInit {
  form: FormGroup; room: Room | null = null; hotel: Hotel | null = null;
  loading = false; error = ''; success = false;
  nights = 0; total = 0;
  Math = Math;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private bookingSvc: BookingService,
    private roomSvc: RoomService, private hotelSvc: HotelService) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    this.form = this.fb.group({
      checkInDate: [today, Validators.required],
      checkOutDate: [tomorrow, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
      specialRequests: ['']
    });
    this.form.valueChanges.subscribe(() => this.calc());
  }

  ngOnInit() {
    const hid = +this.route.snapshot.paramMap.get('id')!;
    const rid = +this.route.snapshot.paramMap.get('roomId')!;
    this.roomSvc.getById(rid).subscribe(r => { this.room = r; this.calc(); });
    this.hotelSvc.getById(hid).subscribe(h => this.hotel = h);
  }

  get maxQty() { return this.room?.availableCount ?? 1; }

  calc() {
    if (!this.room) return;
    const ci = new Date(this.form.value.checkInDate);
    const co = new Date(this.form.value.checkOutDate);
    this.nights = Math.max(0, Math.floor((co.getTime() - ci.getTime()) / 86400000));
    this.total = this.nights * this.room.pricePerNight * Math.max(1, this.form.value.quantity || 1);
  }

  adjustQty(delta: number) {
    const cur = +this.form.value.quantity || 1;
    this.form.patchValue({ quantity: Math.min(this.maxQty, Math.max(1, cur + delta)) });
  }

  submit() {
    if (this.form.invalid || this.nights <= 0) return;
    const qty = this.form.value.quantity;
    if (qty > this.maxQty) { this.error = `Only ${this.maxQty} rooms available.`; return; }
    this.loading = true; this.error = '';
    this.bookingSvc.create({
      roomId: this.room!.id, hotelId: this.hotel!.id,
      checkInDate: this.form.value.checkInDate, checkOutDate: this.form.value.checkOutDate,
      quantity: qty, specialRequests: this.form.value.specialRequests
    }).subscribe({
      next: () => { this.success = true; setTimeout(() => this.router.navigate(['/my-bookings']), 2500); },
      error: err => { this.error = err.error?.message || 'Booking failed.'; this.loading = false; }
    });
  }
}