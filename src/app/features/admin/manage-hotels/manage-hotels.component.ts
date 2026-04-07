import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-manage-hotels',
  templateUrl: './manage-hotels.component.html'
})
export class ManageHotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;
  showForm = false;
  editingHotel: Hotel | null = null;
  saving = false;
  error = '';

  formData = { name: '', location: '', description: '', starRating: 3, amenities: '', imageUrl: '' };

  constructor(private hotelService: HotelService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hotelService.getAll().subscribe(h => { this.hotels = h; this.loading = false; });
  }

  openAdd() {
    this.editingHotel = null;
    this.formData = { name: '', location: '', description: '', starRating: 3, amenities: '', imageUrl: '' };
    this.showForm = true;
    this.error = '';
  }

  openEdit(h: Hotel) {
    this.editingHotel = h;
    this.formData = { name: h.name, location: h.location, description: h.description, starRating: h.starRating, amenities: h.amenities, imageUrl: h.imageUrl || '' };
    this.showForm = true;
    this.error = '';
  }

  save() {
    this.saving = true;
    const obs = this.editingHotel
      ? this.hotelService.update(this.editingHotel.id, { ...this.formData, isActive: true })
      : this.hotelService.create(this.formData);

    obs.subscribe({
      next: () => { this.showForm = false; this.load(); this.saving = false; },
      error: err => { this.error = err.error?.message || 'Failed to save.'; this.saving = false; }
    });
  }

  delete(id: number) {
    if (!confirm('Deactivate this hotel?')) return;
    this.hotelService.delete(id).subscribe(() => this.load());
  }

  getStarArray(n: number): number[] { return Array(n).fill(0); }
}