import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  loading = true;
  searchLocation = '';
  selectedStars: number | null = null;
  stars = [1, 2, 3, 4, 5];

  constructor(private hotelService: HotelService) {}

  ngOnInit() { this.loadHotels(); }

  loadHotels() {
    this.loading = true;
    this.hotelService.getAll(
      this.searchLocation || undefined,
      this.selectedStars || undefined
    ).subscribe({
      next: hotels => { this.hotels = this.filteredHotels = hotels; this.loading = false; },
      error: () => this.loading = false
    });
  }

  search() { this.loadHotels(); }

  clearFilters() {
    this.searchLocation = '';
    this.selectedStars = null;
    this.loadHotels();
  }

  getStarArray(n: number): number[] { return Array(n).fill(0); }
}