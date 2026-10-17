"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GalleryItem } from "@/config/hotel.config";
import { useHotel } from "@/context/HotelContext";

export function Gallery() {
  const hotel = useHotel();
  const gallery = hotel.gallery || [];
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeItem: GalleryItem | null =
    activeItemIndex !== null ? gallery[activeItemIndex] : null;

  const handleOpen = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setActiveItemIndex(index);
  };

  const handleClose = () => {
    setActiveItemIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleNext = () => {
    setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
  };

  const handlePrev = () => {
    setActiveItemIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItemIndex(null);
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      } else if (e.key === "ArrowRight") {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, gallery.length]);

  // Lock body scroll
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItemIndex]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-16 sm:py-24 bg-[#F6F2EA] border-t border-[#E7DDCE]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
              Photo Gallery
            </span>
          </div>
          <h2
            id="gallery-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight mb-2.5"
          >
            Chalet Atmosphere &amp; Views
          </h2>
          <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed">
            Explore authentic photographs of Naka’s Cottage, the private swimming pool, lakefront balconies, loft bedroom, and sunset views.
          </p>
        </div>

        {/* 2-Column on Mobile, 3-Column on Tablet/Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {gallery.map((item, index) => {
            const isWide = index === 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleOpen(index, e)}
                aria-label={`View photo: ${item.caption || item.alt}`}
                className={`group relative overflow-hidden rounded-xl border border-[#E7DDCE] bg-[#FFFCF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31483A] text-left cursor-zoom-in shadow-sm hover:shadow-md transition-all ${
                  isWide
                    ? "col-span-2 aspect-[16/9] sm:aspect-[16/9]"
                    : "aspect-[4/3] sm:aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-4">
                  <span className="text-[10px] sm:text-xs text-[#FFFCF7] font-medium tracking-wide line-clamp-1">
                    {item.caption || item.alt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-[#16221A]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-lg focus:outline-none"
            aria-label="Close photo viewer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Lightbox Frame */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption and Prev/Next */}
            <div className="w-full mt-3 flex items-center justify-between text-white text-xs px-2">
              <span className="font-medium text-xs sm:text-sm text-white/90 truncate max-w-[65%]">
                {activeItem.caption || activeItem.alt}
              </span>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Previous photo"
                >
                  &larr;
                </button>
                <span className="text-[11px] font-mono opacity-70">
                  {activeItemIndex + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Next photo"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
