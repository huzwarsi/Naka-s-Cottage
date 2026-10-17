"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useHotel } from "@/context/HotelContext";
import { Home, Waves, Sunrise, Utensils, BedDouble, Flame } from "lucide-react";

export function Story() {
  const hotel = useHotel();
  const { story } = hotel;
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
              <p>
                Nestled on Unknown Heroes Street in Tbilisi, <strong className="font-bold text-[#1B2E24]">Naka’s Cottage</strong> is a distinctive two-story A-frame chalet offering a peaceful escape for couples, families, and small groups.
              </p>
              <p>
                Enjoy relaxing moments on the private balcony, unwind in the hanging egg chair with a cup of Georgian coffee, and spend sunny afternoons by the swimming pool. In the evening, gather for a traditional Georgian-style barbecue on the balcony and take in the surrounding scenery.
              </p>
              <p>
                Inside, warm natural timber finishes, ambient lighting, a cozy loft-style sleeping area, a modern kitchen with a dishwasher, and a beautifully designed bathroom create a comfortable and inviting retreat.
              </p>
            </div>

            {/* Key Property Highlights with Staggered Entrance Animation */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#E7DDCE]"
            >
              {[
                { label: "Two-Story A-Frame Chalet", icon: Home },
                { label: "Swimming Pool", icon: Waves },
                { label: "Private Balcony & Lake Views", icon: Sunrise },
                { label: "Modern Kitchen with Dishwasher", icon: Utensils },
                { label: "Loft-Style Sleeping Area", icon: BedDouble },
                { label: "Balcony Barbecue Area", icon: Flame },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      transitionDelay: inView ? `${idx * 130}ms` : "0ms",
                    }}
                    className={`group flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl bg-[#F6F2EA] border border-[#E7DDCE] text-[#1B2E24] hover:border-[#B18A5A] hover:bg-white transition-all duration-600 ease-out shadow-2xs hover:shadow-sm transform ${
                      inView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-95"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFFCF7] border border-[#E7DDCE] group-hover:border-[#B18A5A] group-hover:bg-[#31483A] group-hover:text-white flex items-center justify-center shrink-0 transition-all text-[#31483A]">
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-bold text-[#1B2E24] tracking-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
