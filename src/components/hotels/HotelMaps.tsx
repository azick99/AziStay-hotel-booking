// src/components/hotels/HotelMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hotel } from "@/types/hotel.types";

interface Props {
  hotels: Hotel[];
  selectedHotel?: Hotel | null;
  onSelect?: (hotel: Hotel) => void;
  height?: string;
}

export default function HotelMap({
  hotels,
  onSelect,
  height = "400px",
}: Props) {
  // Center map on first hotel or world center
  const center: [number, number] =
    hotels.length > 0
      ? [hotels[0].location.lat, hotels[0].location.lng]
      : [20, 0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden border
                 border-neutral-200 dark:border-neutral-800"
    >
      <MapContainer
        center={center}
        zoom={hotels.length === 1 ? 14 : 3}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        {/* Map tiles — OpenStreetMap (free, no key needed) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.location.lat, hotel.location.lng]}
            eventHandlers={{
              click: () => onSelect?.(hotel),
            }}
          >
            <Popup className="hotel-popup">
              <div className="flex flex-col gap-2 min-w-50 p-1">
                {/* Image */}
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                {/* Info */}
                <div>
                  <p className="font-semibold text-neutral-900 text-sm leading-snug">
                    {hotel.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <p className="text-xs text-neutral-500">
                      {hotel.location.city}, {hotel.location.country}
                    </p>
                  </div>
                </div>
                {/* Price + link */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-brand-600">
                      ${hotel.pricePerNight}
                    </span>
                    <span className="text-xs text-neutral-400">/night</span>
                  </div>
                  <Link
                    to={`/hotel/${hotel.id}`}
                    className="flex items-center gap-1 text-xs font-semibold
                               text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
}
