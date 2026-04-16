import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../../core/models/room.model';

@Pipe({
  name: 'sumAvail',
  standalone: true
})
export class SumAvailablePipe implements PipeTransform {
  transform(rooms: Room[]): number {
    if (!rooms || !Array.isArray(rooms)) return 0;
    return rooms.reduce((sum, room) => sum + (room.availableCount || 0), 0);
  }
}
