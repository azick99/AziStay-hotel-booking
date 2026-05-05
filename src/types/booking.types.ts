export interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingDetails {
  hotelId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  taxes: number;
  grandTotal: number;
}

export interface Booking {
  id: string;
  ref: string;
  details: BookingDetails;
  guest: BookingGuest;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

export interface CompletedBooking {
  id: string;
  ref: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  city: string;
  country: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  total: number;
  taxes: number;
  resortFee: number;
  grandTotal: number;
  status: "confirmed";
  createdAt: string;
}
