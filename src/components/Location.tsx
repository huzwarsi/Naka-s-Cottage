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
      className="py-14 sm:py-20 md:py-24 bg-[#F6F2EA] border-t border-[#E7DDCE]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
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
            <div className="bg-[#FFFCF7] p-5 sm:p-6 rounded-2xl border border-[#E7DDCE] shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#1B2E24]">
                  Exact Cottage Address
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1B2E24] font-semibold leading-relaxed mb-1">
                {location.displayAddress || "65A, Unknown Heroes Street, Tbilisi 0178, Georgia"}
              </p>
              <p className="text-[11px] text-[#6D7168] leading-normal">
                Tbilisi, Georgia • Coordinates: 41.7645° N, 44.8082° E
              </p>
            </div>

            {/* Arrival & Smart Check-in */}
            <div className="bg-[#FFFCF7] p-5 sm:p-6 rounded-2xl border border-[#E7DDCE] shadow-sm space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1B2E24] block mb-1">
                  Access &amp; Smart Check-In
                </span>
                <p className="text-xs text-[#6D7168] leading-relaxed">
                  Private gated territory with automated keypad code. Arrive at any time after 14:00 with 100% contactless self check-in.
                </p>
              </div>

              <div className="pt-2 border-t border-[#E7DDCE] space-y-1.5 text-[11px] text-[#31483A]">
                <div className="flex items-center space-x-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#B18A5A] shrink-0 stroke-[2.5]" />
                  <span>Free secure private parking inside gated courtyard</span>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#B18A5A] shrink-0 stroke-[2.5]" />
                  <span>Easy taxi &amp; Bolt / Yandex access from city center</span>
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
                className="shimmer-btn inline-flex items-center justify-center space-x-2.5 w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

          </div>

          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#E7DDCE] shadow-md bg-[#FFFCF7] relative">
              <iframe
                title="Naka's Cottage Location Map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "340px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
