export interface Booking {
  id: number; userId: number; userName: string; userEmail: string;
  roomId: number; roomNumber: string; roomType: string;
  hotelId: number; hotelName: string; hotelLocation: string;
  checkInDate: string; checkOutDate: string; totalAmount: number;
  quantity: number; status: string; specialRequests?: string;
  createdAt: string; cancelledAt?: string;
}
export interface CreateBookingDto {
  roomId: number; hotelId: number; checkInDate: string;
  checkOutDate: string; quantity: number; specialRequests?: string;
}