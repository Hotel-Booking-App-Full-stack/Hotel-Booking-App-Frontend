import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../../core/models/room.model';

@Pipe({
  name: 'sumBooked',
  standalone: true
})
export class SumBookedPipe implements PipeTransform {
  transform(rooms: Room[]): number {
    if (!rooms || !Array.isArray(rooms)) return 0;
    return rooms.reduce((sum, room) => sum + (room.bookedCount || 0), 0);
  }
}
