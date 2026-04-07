import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, CreateBookingDto } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/booking';

  constructor(private http: HttpClient) {}

  create(dto: CreateBookingDto): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, dto);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  cancel(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/cancel`);
  }
}