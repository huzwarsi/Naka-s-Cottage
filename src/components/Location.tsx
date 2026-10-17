"use client";

import { useHotel } from "@/context/HotelContext";

export function Location() {
  const hotel = useHotel();
  const { location } = hotel;

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="py-20 sm:py-28 md:py-32 bg-[#F6F2EA] border-t border-[#E7DDCE]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2.5 mb-3">
            <span className="w-8 h-[2px] bg-[#B18A5A]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
              Location &amp; Directions
            </span>
          </div>
          <h2
            id="location-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-tight mb-5"
          >
            How to Reach the Resort
          </h2>
          <p className="text-base text-[#6D7168] font-normal leading-relaxed mb-8">
            {location.areaDescription}
          </p>
        </div>

        {/* Location Details Grid with Richer Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mt-10 pt-10 border-t border-[#E7DDCE]">
          
          {/* Location Area & Address (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#FFFCF7] p-6 rounded-sm border border-[#E7DDCE] shadow-sm">
              <span className="text-xs uppercase tracking-wider font-bold text-[#1B2E24] block mb-2">
                Resort Address
              </span>
              <p className="text-sm text-[#6D7168] leading-relaxed font-medium">
                {location.displayAddress}
              </p>
            </div>

            {location.mapUrl && (
              <div>
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center space-x-3 px-6 py-3.5 rounded-sm text-xs uppercase tracking-[0.18em] font-bold text-[#FFFCF7] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
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

          {/* Getting Here (7 cols) */}
          {location.gettingHere && (
            <div className="md:col-span-7 bg-[#FFFCF7] p-7 sm:p-9 rounded-sm border border-[#E7DDCE] shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1B2E24] block mb-3">
                  Transfers &amp; Arrival
                </span>
                <p className="text-sm text-[#6D7168] font-normal leading-relaxed mb-6">
                  {location.gettingHere}
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs text-[#1B2E24] font-semibold pt-4 border-t border-[#E7DDCE]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B18A5A]" aria-hidden="true" />
                <span>Complimentary private 4x4 mountain chauffeur arranged for all suite guests</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
