export interface Room {
  id: number; hotelId: number; hotelName: string;
  roomType: string; roomNumber: string; pricePerNight: number;
  maxOccupancy: number; description: string; isAvailable: boolean;
  totalRooms: number; bookedCount: number; availableCount: number;
}
export interface RoomTypeSummary {
  roomType: string; totalRooms: number; bookedCount: number;
  availableCount: number; minPrice: number; rooms: Room[];
}
export interface AdminRoomStats {
  totalRoomEntries: number; totalRoomsCapacity: number;
  totalBooked: number; totalAvailable: number;
  byType: { roomType: string; totalRooms: number; booked: number; available: number; }[];
}
export interface CreateRoomDto {
  hotelId: number; roomType: string; roomNumber: string;
  pricePerNight: number; maxOccupancy: number; description?: string; totalRooms: number;
}