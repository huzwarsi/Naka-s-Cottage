"use client";

import { useState } from "react";
import Image from "next/image";
import { useHotel } from "@/context/HotelContext";

export function Amenities() {
  const hotel = useHotel();
  const { amenities } = hotel;
  const [selectedAmenity, setSelectedAmenity] = useState<number>(0);

  if (!amenities || amenities.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 sm:py-24 bg-[#FFFCF7] border-t border-[#E7DDCE] relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
                Cottage Amenities
              </span>
            </div>
            <h2
              id="experience-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight"
            >
              Exclusive Private Features
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6D7168] font-normal max-w-md leading-relaxed">
            From the private outdoor pool to lakeside balconies with an egg chair and barbecue mangal, every detail is crafted for complete privacy and comfort.
          </p>
        </div>

        {/* Amenity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {amenities.map((item, index) => {
            const isSelected = selectedAmenity === index;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAmenity(index)}
                className={`group flex flex-col bg-[#F6F2EA] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#31483A] shadow-lg -translate-y-1"
                    : "border-[#E7DDCE] hover:border-[#B18A5A] hover:shadow-md"
                }`}
              >
                {/* Photography */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#E7DDCE]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-[#FFFCF7]/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] uppercase tracking-[0.16em] font-bold text-[#1B2E24] rounded-md border border-[#E7DDCE] shadow-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 text-xs font-serif font-bold text-[#FFFCF7] drop-shadow-md">
                    0{index + 1}
                  </span>
                </div>

                {/* Description */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#1B2E24] font-bold mb-2 group-hover:text-[#31483A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7DDCE] flex items-center justify-between text-[11px] font-bold text-[#31483A]">
                    <span className="uppercase tracking-[0.12em]">Included in Stay</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
