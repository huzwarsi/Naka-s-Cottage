"use client";

import Link from "next/link";
import { useHotel } from "@/context/HotelContext";

export function DemoBanner() {
  const hotel = useHotel();
  if (!hotel.demoMode) return null;

  return (
    <aside
      aria-label="Demo Notice"
      className="bg-[#1A2820] text-[#FFFCF7] text-[11px] py-1.5 px-4 text-center border-b border-[#31483A] relative z-50 tracking-wide font-light flex items-center justify-between"
    >
      <div className="flex items-center space-x-2 mx-auto sm:mx-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
        <span>
          <strong>Live Pitch Demo:</strong> {hotel.name} &bull; {hotel.location.region}, {hotel.location.country}
        </span>
      </div>

      <div className="hidden sm:flex items-center space-x-3">
        <Link
          href="/admin"
          className="px-2.5 py-0.5 rounded bg-[#25352A] hover:bg-[#31483A] border border-[#3E5547] text-[10px] uppercase tracking-wider font-bold text-[#25D366] transition-colors"
        >
          ⚙ Open Admin Panel
        </Link>
      </div>
    </aside>
  );
}
