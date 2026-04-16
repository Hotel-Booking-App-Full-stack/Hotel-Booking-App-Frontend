import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../../core/models/hotel.model';
import { Room, RoomTypeSummary } from '../../../core/models/room.model';
import { HotelService } from '../../../core/services/hotel.service';
import { RoomService } from '../../../core/services/room.service';

@Component({ selector: 'app-hotel-detail', templateUrl: './hotel-detail.component.html' })
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  rooms: Room[] = []; summaries: RoomTypeSummary[] = [];
  loading = true;
  filterType = ''; filterMin: number | null = null;
  filterMax: number | null = null; filterAvail = false;
  roomTypes: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private hotelSvc: HotelService, private roomSvc: RoomService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.hotelSvc.getById(id).subscribe(h => this.hotel = h);
    this.roomSvc.getSummary(id).subscribe(s => {
      this.summaries = s; this.roomTypes = s.map(x => x.roomType);
    });
    this.loadRooms(id);
  }

  loadRooms(hid?: number) {
    const id = hid || this.hotel!.id;
    this.loading = true;
    this.roomSvc.getByHotel(id, {
      roomType: this.filterType || undefined,
      minPrice: this.filterMin ?? undefined,
      maxPrice: this.filterMax ?? undefined,
      availableOnly: this.filterAvail || undefined
    }).subscribe(r => { this.rooms = r; this.loading = false; });
  }

  applyFilters() { this.loadRooms(); }
  clearFilters() { this.filterType = ''; this.filterMin = null; this.filterMax = null; this.filterAvail = false; this.loadRooms(); }
  book(r: Room) { if (r.availableCount > 0) this.router.navigate(['/hotels', this.hotel!.id, 'book', r.id]); }
  stars(n: number) { return Array(n).fill(0); }

  availClass(r: Room): string {
    const pct = r.availableCount / r.totalRooms;
    if (pct === 0) return 'none'; if (pct <= 0.3) return 'low'; return 'ok';
  }

  getSummary(type: string) { return this.summaries.find(s => s.roomType === type); }
}