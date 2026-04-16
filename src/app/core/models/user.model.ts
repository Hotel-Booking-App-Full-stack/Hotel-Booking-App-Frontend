export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  fullName: string;
  email: string;
  role: string;
  userId: number;
  expiresAt: string;
  isEmailVerified: boolean;
}

export interface UserDto {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  bookingCount: number;
}