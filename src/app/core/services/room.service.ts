import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, CreateRoomDto } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'http://localhost:5079/api/room';

  constructor(private http: HttpClient) {}

  getByHotel(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateRoomDto): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, dto);
  }

  update(id: number, dto: any): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}