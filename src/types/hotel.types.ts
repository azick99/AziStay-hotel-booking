export type Amenity =
  | "Free Wi-Fi"
  | "Swimming Pool"
  | "Gym"
  | "Spa"
  | "Restaurant"
  | "Bar"
  | "Parking"
  | "Airport Shuttle";

export type Catergory =
  | "luxury"
  | "boutique"
  | "resort"
  | "budget"
  | "business";

export type Location = {
  city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedType?: "Single" | "Double" | "Queen" | "King";
  beds: string;
  size: number; // in square meters
  amenities: string[];
  available: boolean;
};

export type Review = {
  id: string;
  hotelId?: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
};

export type Hotel = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: Location;
  stars: number;
  rating: number;
  pricePerNight: number;
  images: string[];
  amenities: Amenity[];
  rooms: Room[];
  reviews: Review[];
  featured: boolean;
  category: Catergory;
  tags: string[];
};
