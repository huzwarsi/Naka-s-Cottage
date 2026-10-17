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

  // Handle keyboard navigation: Esc, Left, Right
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

  // Lock body scroll when lightbox is open
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
      className="py-16 sm:py-24 md:py-28 bg-[#F6F2EA] border-t border-[#E7DDCE]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center space-x-2.5 mb-3">
            <span className="w-8 h-[2px] bg-[#B18A5A]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
              Photo Gallery
            </span>
          </div>
          <h2
            id="gallery-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-tight mb-4"
          >
            Villa &amp; Mountain Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#6D7168] font-normal leading-relaxed">
            Take a visual tour of our private heated pool villas, sun terraces, and mountain views. Click any photo to open in full screen.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((item, index) => {
            // Give subtle varied aspect ratios for an asymmetric editorial look
            const isWide = index === 0 || index === 4;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleOpen(index, e)}
                aria-label={`View photo: ${item.caption || item.alt}`}
                className={`group relative overflow-hidden rounded-sm border border-[#E7DDCE] bg-[#FFFCF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31483A] text-left cursor-zoom-in ${
                  isWide ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle caption overlay on hover/focus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                  <span className="text-xs text-[#FFFCF7] font-medium tracking-wide">
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
          className="fixed inset-0 z-50 bg-[#252A24]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={handleClose}
        >
          {/* Controls Bar */}
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center space-x-3"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-[#FFFCF7]/75 font-sans mr-2">
              {activeItemIndex + 1} of {gallery.length}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="p-2.5 rounded-sm bg-[#FFFCF7]/10 text-[#FFFCF7] hover:bg-[#FFFCF7]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFCF7]"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#FFFCF7]/10 text-[#FFFCF7] hover:bg-[#FFFCF7]/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFCF7]"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#FFFCF7]/10 text-[#FFFCF7] hover:bg-[#FFFCF7]/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFCF7]"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-5xl max-h-[82vh] w-full h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {activeItem.caption && (
              <p className="mt-4 text-xs sm:text-sm text-[#FFFCF7]/85 text-center font-sans">
                {activeItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
