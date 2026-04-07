import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../../core/models/hotel.model';
import { Room } from '../../../core/models/room.model';
import { HotelService } from '../../../core/services/hotel.service';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html'
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  rooms: Room[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.hotelService.getById(id).subscribe(h => {
      this.hotel = h;
      this.roomService.getByHotel(id).subscribe(r => {
        this.rooms = r;
        this.loading = false;
      });
    });
  }

  book(room: Room) {
    this.router.navigate(['/hotels', this.hotel!.id, 'book', room.id]);
  }

  getStarArray(n: number): number[] { return Array(n).fill(0); }
}