export interface Room {
  id: number;
  hotelId: number;
  hotelName: string;
  roomType: string;
  roomNumber: string;
  pricePerNight: number;
  maxOccupancy: number;
  description: string;
  isAvailable: boolean;
}

export interface CreateRoomDto {
  hotelId: number;
  roomType: string;
  roomNumber: string;
  pricePerNight: number;
  maxOccupancy: number;
  description?: string;
}