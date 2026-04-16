import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';

@Component({ selector: 'app-hotel-list', templateUrl: './hotel-list.component.html' })
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;
  searchLoc = ''; selectedStars: number | null = null;

  constructor(private hotelSvc: HotelService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hotelSvc.getAll(this.searchLoc || undefined, this.selectedStars || undefined)
      .subscribe({ next: h => { this.hotels = h; this.loading = false; }, error: () => this.loading = false });
  }

  clearFilters() { this.searchLoc = ''; this.selectedStars = null; this.load(); }
  stars(n: number) { return Array(n).fill(0); }
}