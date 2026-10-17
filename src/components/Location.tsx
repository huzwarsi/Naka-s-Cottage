"use client";

import { useHotel } from "@/context/HotelContext";

export function Location() {
  const hotel = useHotel();
  const { location } = hotel;

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="py-14 sm:py-20 md:py-24 bg-[#F6F2EA] border-t border-[#E7DDCE]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
              Location &amp; Directions
            </span>
          </div>
          <h2
            id="location-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight mb-3"
          >
            How to Reach Naka’s Cottage
          </h2>
          <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed mb-6">
            {location.areaDescription}
          </p>
        </div>

        {/* Location Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mt-6 pt-6 border-t border-[#E7DDCE]">
          
          {/* Address Card (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#FFFCF7] p-5 sm:p-6 rounded-2xl border border-[#E7DDCE] shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#1B2E24] block mb-1.5">
                Chalet Address
              </span>
              <p className="text-xs sm:text-sm text-[#6D7168] leading-relaxed font-medium">
                {location.displayAddress}
              </p>
            </div>

            {location.mapUrl && (
              <div>
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center justify-center space-x-2.5 w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Transfers & Arrival Card (7 cols) */}
          {location.gettingHere && (
            <div className="md:col-span-7 bg-[#FFFCF7] p-5 sm:p-7 rounded-2xl border border-[#E7DDCE] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1B2E24] block mb-2">
                  Arrival &amp; Self Check-In
                </span>
                <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed mb-4">
                  {location.gettingHere}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-[#1B2E24] font-semibold pt-3 border-t border-[#E7DDCE]">
                <span className="w-2 h-2 rounded-full bg-[#B18A5A] shrink-0" aria-hidden="true" />
                <span>Smart digital keypad code provided prior to arrival for 24/7 seamless self check-in</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
