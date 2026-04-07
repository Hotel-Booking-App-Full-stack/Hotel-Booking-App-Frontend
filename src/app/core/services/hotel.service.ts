import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel, CreateHotelDto } from '../models/hotel.model';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiUrl = 'http://localhost:5000/api/hotel';

  constructor(private http: HttpClient) {}

  getAll(location?: string, stars?: number): Observable<Hotel[]> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (stars) params = params.set('stars', stars.toString());
    return this.http.get<Hotel[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateHotelDto): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, dto);
  }

  update(id: number, dto: any): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}