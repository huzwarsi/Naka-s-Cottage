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
      className="py-20 sm:py-28 md:py-32 bg-[#FFFCF7] border-y border-[#E7DDCE] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Architectural Image (5 cols) with subtle hover shift */}
          <div className="lg:col-span-5 order-2 lg:order-1 group">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#E7DDCE] shadow-xl bg-[#E7DDCE]">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#FFFCF7]/95 backdrop-blur-md p-4 rounded-sm border border-[#E7DDCE] text-xs">
                <span className="font-serif text-sm font-bold text-[#1B2E24] block">
                  Private Architectural Villas
                </span>
                <span className="text-[#6D7168] text-[11px] mt-0.5 block">
                  Modern design with heated swimming pools &amp; mountain views
                </span>
              </div>
            </div>

            {story.quote && (
              <figure className="mt-6 border-l-3 border-[#B18A5A] pl-4 sm:pl-5 py-1">
                <blockquote className="font-serif italic font-semibold text-base sm:text-lg text-[#1B2E24] leading-snug">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                {story.quoteAuthor && (
                  <figcaption className="text-xs uppercase tracking-[0.2em] font-bold text-[#6D7168] mt-2">
                    — {story.quoteAuthor}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          {/* Narrative Content (7 cols) with Bold Editorial Typography */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            {story.eyebrow && (
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="w-8 h-[2px] bg-[#B18A5A]" />
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
                  {story.eyebrow}
                </span>
              </div>
            )}

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-[1.18] mb-6 sm:mb-8">
              {story.heading}
            </h2>

            <div className="space-y-4 sm:space-y-5 text-base text-[#6D7168] font-normal leading-relaxed max-w-2xl">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Design & Material Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-[#E7DDCE]">
              <div className="p-4 rounded-sm bg-[#F6F2EA] border border-[#E7DDCE]">
                <span className="font-serif text-2xl sm:text-3xl text-[#1B2E24] font-bold block">
                  12
                </span>
                <span className="text-[11px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-1">
                  Private Villas
                </span>
              </div>
              <div className="p-4 rounded-sm bg-[#F6F2EA] border border-[#E7DDCE]">
                <span className="font-serif text-2xl sm:text-3xl text-[#1B2E24] font-bold block">
                  Heated
                </span>
                <span className="text-[11px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-1">
                  Private Pools
                </span>
              </div>
              <div className="p-4 rounded-sm bg-[#F6F2EA] border border-[#E7DDCE]">
                <span className="font-serif text-2xl sm:text-3xl text-[#1B2E24] font-bold block">
                  2,100 m
                </span>
                <span className="text-[11px] text-[#1B2E24] font-bold uppercase tracking-wider block mt-1">
                  Mountain Peak
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
