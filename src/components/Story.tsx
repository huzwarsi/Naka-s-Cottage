"use client";

import Image from "next/image";
import { useHotel } from "@/context/HotelContext";

export function Story() {
  const hotel = useHotel();
  const { story } = hotel;

  return (
    <section
      id="story"
      aria-label="About the Property"
      className="py-16 sm:py-24 md:py-28 bg-[#FFFCF7] border-y border-[#E7DDCE] relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Architectural Image */}
          <div className="lg:col-span-5 order-2 lg:order-1 group">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#E7DDCE] shadow-lg bg-[#E7DDCE]">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 bg-[#FFFCF7]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E7DDCE] text-xs shadow-md">
                <span className="font-serif text-sm font-bold text-[#1B2E24] block">
                  Private Architectural Chalet
                </span>
                <span className="text-[#6D7168] text-[11px] mt-0.5 block">
                  Natural timber architecture with private swimming pool &amp; lake views
                </span>
              </div>
            </div>

            {story.quote && (
              <figure className="mt-5 border-l-2 border-[#B18A5A] pl-3.5 sm:pl-4 py-0.5">
                <blockquote className="font-serif italic font-semibold text-sm sm:text-base text-[#1B2E24] leading-snug">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                {story.quoteAuthor && (
                  <figcaption className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-bold text-[#6D7168] mt-1.5">
                    — {story.quoteAuthor}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            {story.eyebrow && (
              <div className="flex items-center space-x-2 mb-2.5">
                <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
                  {story.eyebrow}
                </span>
              </div>
            )}

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-[1.2] mb-4 sm:mb-6">
              {story.heading}
            </h2>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base text-[#6D7168] font-normal leading-relaxed max-w-2xl">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Design & Material Highlights Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#E7DDCE]">
              <div className="p-2.5 sm:p-4 rounded-xl bg-[#F6F2EA] border border-[#E7DDCE] text-center sm:text-left">
                <span className="font-serif text-lg sm:text-2xl text-[#1B2E24] font-bold block">
                  2-Story
                </span>
                <span className="text-[9px] sm:text-[10.5px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-0.5">
                  A-Frame Chalet
                </span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl bg-[#F6F2EA] border border-[#E7DDCE] text-center sm:text-left">
                <span className="font-serif text-lg sm:text-2xl text-[#1B2E24] font-bold block">
                  Private
                </span>
                <span className="text-[9px] sm:text-[10.5px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-0.5">
                  Swimming Pool
                </span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl bg-[#F6F2EA] border border-[#E7DDCE] text-center sm:text-left">
                <span className="font-serif text-lg sm:text-2xl text-[#1B2E24] font-bold block">
                  180°
                </span>
                <span className="text-[9px] sm:text-[10.5px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-0.5">
                  Lake Panorama
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
