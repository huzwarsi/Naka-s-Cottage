"use client";

import { useState } from "react";
import Image from "next/image";
import { useHotel } from "@/context/HotelContext";

export function Amenities() {
  const hotel = useHotel();
  const { amenities, contact, name } = hotel;
  const [selectedAmenity, setSelectedAmenity] = useState<number>(0);

  const whatsappDisplay = (contact as any)?.whatsappNumber || "03132220567";
  const cleanDigits = whatsappDisplay.replace(/[^0-9]/g, "");
  const whatsappRaw = cleanDigits.startsWith("0") ? "92" + cleanDigits.slice(1) : cleanDigits;

  if (!amenities || amenities.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 sm:py-28 md:py-32 bg-[#FFFCF7] border-t border-[#E7DDCE] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="w-8 h-[2px] bg-[#B18A5A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
                Resort Facilities
              </span>
            </div>
            <h2
              id="experience-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-tight"
            >
              World-Class Amenities &amp; Services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6D7168] font-normal max-w-md leading-relaxed">
            Every villa includes temperature-controlled private pools, chef-prepared dining, traditional cedar saunas, and luxury 4x4 mountain transportation.
          </p>
        </div>

        {/* Interactive Experience Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {amenities.map((item, index) => {
            const isSelected = selectedAmenity === index;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAmenity(index)}
                className={`group flex flex-col bg-[#F6F2EA] rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer ${
                  isSelected
                    ? "border-[#31483A] shadow-xl -translate-y-2"
                    : "border-[#E7DDCE] hover:border-[#B18A5A] hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Photography with subtle zoom effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E7DDCE]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                  {item.tag && (
                    <span className="absolute top-3.5 left-3.5 bg-[#FFFCF7]/95 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-bold text-[#1B2E24] rounded-sm border border-[#E7DDCE] shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3.5 right-3.5 text-xs font-serif font-bold text-[#FFFCF7] drop-shadow-md">
                    0{index + 1}
                  </span>
                </div>

                {/* Editorial Description */}
                <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1B2E24] font-bold mb-3 group-hover:text-[#31483A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6D7168] font-normal leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7DDCE] flex items-center justify-between text-xs font-bold text-[#31483A]">
                    <span className="uppercase tracking-[0.14em]">Included with Every Booking</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seasonal Experience Banner */}
        <div className="mt-16 bg-[#16241D] rounded-sm p-8 sm:p-12 text-[#FFFCF7] relative overflow-hidden shadow-xl border border-[#31483A]">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B18A5A] font-bold mb-3 block">
              VIP Guest Inclusions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFFCF7] font-bold leading-snug mb-4">
              Private Chef Breakfast &amp; 4x4 Mountain Transfers
            </h3>
            <p className="text-sm sm:text-base text-[#FFFCF7]/85 font-light leading-relaxed mb-8">
              Every reservation includes complimentary private 4x4 airport pickup from Tbilisi, chef-prepared gourmet breakfast served directly to your villa, and daily private pool heating.
            </p>
            <a
              href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                `Hello! I want to enquire about booking a luxury villa at ${name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] transition-all duration-300 rounded-full shadow-lg"
            >
              <span>Enquire on WhatsApp</span>
              <span className="font-mono text-[10px] bg-black/25 px-2 py-0.5 rounded-full">
                {whatsappDisplay}
              </span>
            </a>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <span className="font-serif text-[180px] font-bold text-[#FFFCF7]">2100</span>
          </div>
        </div>

      </div>
    </section>
  );
}
