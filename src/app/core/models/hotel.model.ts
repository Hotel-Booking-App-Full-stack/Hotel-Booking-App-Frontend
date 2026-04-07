export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  starRating: number;
  amenities: string;
  imageUrl: string;
  isActive: boolean;
  roomCount: number;
  minPrice: number;
}

export interface CreateHotelDto {
  name: string;
  location: string;
  description?: string;
  starRating: number;
  amenities?: string;
  imageUrl?: string;
}