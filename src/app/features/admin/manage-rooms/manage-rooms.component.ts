import { Component, OnInit } from '@angular/core';
import { Room, AdminRoomStats } from '../../../core/models/room.model';
import { Hotel } from '../../../core/models/hotel.model';
import { RoomService } from '../../../core/services/room.service';
import { HotelService } from '../../../core/services/hotel.service';

@Component({ selector: 'app-manage-rooms', templateUrl: './manage-rooms.component.html' })
export class ManageRoomsComponent implements OnInit {
  rooms: Room[] = []; hotels: Hotel[] = []; stats: AdminRoomStats | null = null;
  loading = true; showForm = false; saving = false; error = '';
  editingId: number | null = null;
  filterHotel = 0; filterType = ''; filterStatus = '';
  formData = { hotelId: 0, roomType: 'Standard', roomNumber: '', pricePerNight: 100, maxOccupancy: 2, description: '', totalRooms: 10 };

  constructor(private roomSvc: RoomService, private hotelSvc: HotelService) {}

  ngOnInit() {
    this.hotelSvc.getAll().subscribe(h => this.hotels = h);
    this.loadRooms();
    this.loadStats();
  }

  loadRooms() {
    this.loading = true;
    this.roomSvc.getAll().subscribe(r => { this.rooms = r; this.loading = false; });
  }

  loadStats() { this.roomSvc.getAdminStats().subscribe(s => this.stats = s); }

  get allTypes() { return [...new Set(this.rooms.map(r => r.roomType))]; }

  get filtered() {
    return this.rooms.filter(r => {
      if (this.filterHotel && r.hotelId !== this.filterHotel) return false;
      if (this.filterType && r.roomType !== this.filterType) return false;
      if (this.filterStatus === 'available' && r.availableCount === 0) return false;
      if (this.filterStatus === 'booked' && r.availableCount > 0) return false;
      return true;
    });
  }

  openAdd() {
    this.editingId = null;
    this.formData = { hotelId: this.hotels[0]?.id || 0, roomType: 'Standard', roomNumber: '', pricePerNight: 100, maxOccupancy: 2, description: '', totalRooms: 10 };
    this.showForm = true; this.error = '';
  }

  openEdit(r: Room) {
    this.editingId = r.id;
    this.formData = { hotelId: r.hotelId, roomType: r.roomType, roomNumber: r.roomNumber, pricePerNight: r.pricePerNight, maxOccupancy: r.maxOccupancy, description: r.description || '', totalRooms: r.totalRooms };
    this.showForm = true; this.error = '';
  }

  save() {
    this.saving = true;
    const obs = this.editingId
      ? this.roomSvc.update(this.editingId, { ...this.formData, isAvailable: true })
      : this.roomSvc.create(this.formData);
    obs.subscribe({
      next: () => { this.showForm = false; this.loadRooms(); this.loadStats(); this.saving = false; },
      error: err => { this.error = err.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  delete(id: number) {
    if (!confirm('Delete this room?')) return;
    this.roomSvc.delete(id).subscribe(() => { this.loadRooms(); this.loadStats(); });
  }
}