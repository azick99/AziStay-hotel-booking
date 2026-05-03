export type Amenity =
  | "wifi"
  | "pool"
  | "spa"
  | "gym"
  | "restaurant"
  | "bar"
  | "parking"
  | "pet-friendly"
  | "beach-access"
  | "room-service"
  | "airport-shuttle"
  | "concierge"
  | "business-center"
  | "kids-club";

export interface HotelLocation {
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  beds: string; // e.g. "1 King Bed"
  size: number; // sqm
  images: string[];
  amenities: string[];
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: HotelLocation;
  stars: 1 | 2 | 3 | 4 | 5;
  rating: number; // 1.0 – 10.0
  reviewCount: number;
  pricePerNight: number; // lowest room price
  images: string[]; // [0] = cover image
  amenities: Amenity[];
  rooms: Room[];
  reviews: Review[];
  featured: boolean;
  category: "luxury" | "boutique" | "resort" | "budget" | "business";
  tags: string[]; // e.g. ['beach', 'romantic', 'family']
}
