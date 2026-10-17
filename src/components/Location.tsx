"use client";

import { useHotel } from "@/context/HotelContext";
import { Check, ExternalLink } from "lucide-react";

export function Location() {
  const hotel = useHotel();
  const { location } = hotel;

  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.96085066955!2d44.808257575520464!3d41.7645018725199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446dd3fe1e4889%3A0x2f9f695d0d5b1944!2zTmFrYSdzIGNvdHRhZ2UgLyDhg5zhg5Dhg5nhg5Dhg6Eg4YOZ4YOd4YOi4YOU4YOv4YOY!5e0!3m2!1sen!2s!4v1792217243214!5m2!1sen!2s";

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 bg-[#F6F2EA]"
    >
      {/* Outer Rounded Luxury Frame matching Gallery & Rooms */}
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#FFFCF7] p-6 sm:p-10 md:p-12 shadow-2xl border border-[#E7DDCE] max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
              Location &amp; Directions
            </span>
          </div>
          <h2
            id="location-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight mb-2.5"
          >
            How to Reach Naka’s Cottage
          </h2>
          <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed">
            {location.areaDescription ||
              "Perched in a peaceful neighborhood along Tbilisi lake, Naka's Cottage offers private gate parking, smart keypad self check-in, and panoramic mountain breezes."}
          </p>
        </div>

        {/* Location Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Address & Travel Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Card */}
            <div className="bg-[#F6F2EA]/80 p-6 rounded-[22px] sm:rounded-[26px] border border-[#E7DDCE] shadow-xs hover:border-[#B18A5A] transition-all">
              <div className="flex items-center space-x-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#1B2E24]">
                  Exact Cottage Address
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#1B2E24] font-bold leading-relaxed mb-1.5">
                {location.displayAddress || "65A, Unknown Heroes Street, Tbilisi 0178, Georgia"}
              </p>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#E7DDCE]/50 text-[10.5px] text-[#6D7168] font-mono">
                <span>41.7645° N, 44.8082° E</span>
                <span>&bull;</span>
                <span>Tbilisi Lake Shore</span>
              </div>
            </div>

            {/* Arrival & Smart Check-in */}
            <div className="bg-[#F6F2EA]/80 p-6 rounded-[22px] sm:rounded-[26px] border border-[#E7DDCE] shadow-xs hover:border-[#B18A5A] transition-all space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-extrabold text-[#1B2E24] block mb-1">
                  Access &amp; Smart Check-In
                </span>
                <p className="text-xs sm:text-[13px] text-[#6D7168] leading-relaxed">
                  Private gated territory with automated digital keypad lock. Arrive anytime after 14:00 with effortless 100% contactless self check-in.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7DDCE] space-y-2 text-xs text-[#31483A]">
                <div className="flex items-center space-x-2.5 font-semibold">
                  <Check className="w-4 h-4 text-[#B18A5A] shrink-0 stroke-[2.5]" />
                  <span>Free secure private parking inside gated courtyard</span>
                </div>
                <div className="flex items-center space-x-2.5 font-semibold">
                  <Check className="w-4 h-4 text-[#B18A5A] shrink-0 stroke-[2.5]" />
                  <span>Easy taxi &amp; Bolt / Yandex access from city center (15-20 min)</span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div>
              <a
                href={
                  location.mapUrl ||
                  "https://maps.google.com/?q=65A+Unknown+Heroes+Street+Tbilisi+0178+Georgia"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 w-full py-4 px-6 rounded-full text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#1B2E24] hover:bg-[#31483A] shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

          </div>

          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full min-h-[380px] sm:min-h-[460px] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#E7DDCE] shadow-lg bg-[#F6F2EA] relative">
              {/* Floating Pill on Map */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#1B2E24]/90 backdrop-blur-md text-[#E7DDCE] text-xs font-semibold border border-[#E7DDCE]/30 shadow-md flex items-center space-x-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Naka’s Cottage &bull; Tbilisi Lake Shore</span>
              </div>

              <iframe
                title="Naka's Cottage Location Map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full rounded-[24px] sm:rounded-[30px]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
