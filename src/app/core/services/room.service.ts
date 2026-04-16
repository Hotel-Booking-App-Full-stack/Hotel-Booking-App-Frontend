import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomTypeSummary, AdminRoomStats, CreateRoomDto } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private api = 'http://localhost:5079/api/room';
  constructor(private http: HttpClient) {}

  getByHotel(hotelId: number, f?: {
    roomType?: string; minPrice?: number; maxPrice?: number; availableOnly?: boolean;
  }): Observable<Room[]> {
    let p = new HttpParams();
    if (f?.roomType) p = p.set('roomType', f.roomType);
    if (f?.minPrice != null) p = p.set('minPrice', f.minPrice.toString());
    if (f?.maxPrice != null) p = p.set('maxPrice', f.maxPrice.toString());
    if (f?.availableOnly != null) p = p.set('availableOnly', f.availableOnly.toString());
    return this.http.get<Room[]>(`${this.api}/hotel/${hotelId}`, { params: p });
  }

  getSummary(hotelId: number): Observable<RoomTypeSummary[]> {
    return this.http.get<RoomTypeSummary[]>(`${this.api}/hotel/${hotelId}/summary`);
  }

  getAdminStats(): Observable<AdminRoomStats> {
    return this.http.get<AdminRoomStats>(`${this.api}/admin/stats`);
  }

  getAll(): Observable<Room[]> { return this.http.get<Room[]>(this.api); }
  getById(id: number): Observable<Room> { return this.http.get<Room>(`${this.api}/${id}`); }
  create(dto: CreateRoomDto): Observable<Room> { return this.http.post<Room>(this.api, dto); }
  update(id: number, dto: any): Observable<Room> { return this.http.put<Room>(`${this.api}/${id}`, dto); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.api}/${id}`); }
}