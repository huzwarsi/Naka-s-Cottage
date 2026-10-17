"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useHotel } from "@/context/HotelContext";
import { getWhatsAppRawDigits } from "@/lib/formatPhone";

const defaultHeroSlides = [
  {
    url: "/images/client/chalet-night-illumination.png",
    alt: "Naka's Cottage illuminated A-frame chalet at night with warm LED roofline",
    title: "Night Illumination & Warm Ambiance",
  },
  {
    url: "/images/client/chalet-golden-hour-front.png",
    alt: "Golden hour sunset architecture of Naka's Cottage with private balconies",
    title: "Architectural A-Frame Golden Hour",
  },
  {
    url: "/images/client/chalet-lakeview-deck.png",
    alt: "Panoramic wooden balcony deck overlooking turquoise Tbilisi lake",
    title: "Panoramic Lake & Mountain Deck",
  },
  {
    url: "/images/client/chalet-outdoor-pool.png",
    alt: "Private outdoor swimming pool with sun loungers and green privacy hedges",
    title: "Private Outdoor Pool & Sun Terrace",
  },
  {
    url: "/images/client/chalet-balcony-egg-chair.png",
    alt: "Hanging rattan egg chair on wooden balcony facing panoramic lake vista",
    title: "Lakeside Egg Chair Balcony",
  },
  {
    url: "/images/client/chalet-lake-sunset.png",
    alt: "Golden sunset reflecting over the peaceful lake waters",
    title: "Golden Hour Lake Reflection",
  },
];

export function Hero() {
  const hotel = useHotel();
  const { hero, rooms, contact } = hotel;
  const [activeSlide, setActiveSlide] = useState(0);
  const [quickCheckIn, setQuickCheckIn] = useState("");
  const [quickCheckOut, setQuickCheckOut] = useState("");
  const [quickRoom, setQuickRoom] = useState(rooms[0]?.id || "");
  const [quickGuests, setQuickGuests] = useState(2);

  const whatsappDisplay = (contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);

  const slides = (hero as any)?.slides && (hero as any).slides.length > 0
    ? (hero as any).slides
    : defaultHeroSlides;

  // Auto-animate every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleWhatsAppQuickBook = () => {
    const roomObj = rooms.find((r) => r.id === quickRoom);
    const roomName = roomObj ? roomObj.name : "A-Frame Chalet";
    const msg = [
      `Hello! I want to inquire about booking at ${hotel.name}.`,
      quickCheckIn ? `Check-in: ${quickCheckIn}` : "",
      quickCheckOut ? `Check-out: ${quickCheckOut}` : "",
      `Guests: ${quickGuests}`,
      `Selected Option: ${roomName}`,
      `Please share availability and direct rates.`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      aria-label="Welcome"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#16241D]"
    >
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide: any, index: number) => {
          const isActive = activeSlide === index;
          return (
            <div
              key={slide.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className={`object-cover object-center transform transition-transform duration-[4500ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#16241D] via-[#16241D]/60 to-black/45 pointer-events-none" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-20 max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 w-full flex-1 flex flex-col justify-center text-center items-center my-auto">
        
        {/* Eyebrow */}
        <div className="flex items-center space-x-2.5 mb-3 animate-fade-in">
          <span className="w-6 sm:w-8 h-[1.5px] bg-[#B18A5A]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#E8CBA5]">
            {hero.eyebrow}
          </span>
          <span className="w-6 sm:w-8 h-[1.5px] bg-[#B18A5A]" />
        </div>

        {/* Refined Headline (Scaled proportionately) */}
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#FFFCF7] font-bold tracking-tight leading-[1.14] mb-3.5 sm:mb-4.5 drop-shadow-xl animate-fade-in-up max-w-3xl">
          {hero.headline}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#FFFCF7]/90 font-light leading-relaxed max-w-xl mb-5 sm:mb-6 drop-shadow animate-fade-in">
          {hero.description}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto animate-fade-in mb-5">
          <a
            href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
              `Hello! I want to enquire about booking and rates at ${hotel.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Book on WhatsApp</span>
          </a>

          <a
            href="#stay"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold text-[#FFFCF7] hover:text-[#B18A5A] border border-[#FFFCF7]/30 hover:border-[#B18A5A] bg-[#FFFCF7]/10 backdrop-blur-md rounded-full transition-all duration-300 w-full sm:w-auto"
          >
            Explore Cottage &amp; Rooms
          </a>
        </div>

        {/* Highlight Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs text-[#FFFCF7]/90 animate-fade-in mb-4">
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#FFFCF7]/15 flex items-center space-x-1">
            <span className="text-[#25D366]">✓</span>
            <span>Private Pool</span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#FFFCF7]/15 flex items-center space-x-1">
            <span className="text-[#25D366]">✓</span>
            <span>Lakeview Balcony &amp; Mangal BBQ</span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#FFFCF7]/15 flex items-center space-x-1">
            <span className="text-[#25D366]">✓</span>
            <span>Full Kitchen &amp; Dishwasher</span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#B18A5A]/35 backdrop-blur-md border border-[#B18A5A]/50 flex items-center space-x-1 font-medium text-[#FFFCF7]">
            <span className="text-[#F59E0B]">★</span>
            <span>4.0 (29 Reviews)</span>
          </span>
        </div>

        {/* Slide Pagination Dots */}
        <div className="flex items-center justify-center space-x-1.5 pt-1">
          {slides.map((slide: any, i: number) => {
            const isCurr = activeSlide === i;
            return (
              <button
                key={slide.url}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 ${
                  isCurr ? "w-8 sm:w-10" : "w-3 hover:w-5"
                }`}
              >
                <div
                  className={`h-1 rounded-full w-full transition-all duration-300 ${
                    isCurr
                      ? "bg-[#25D366]"
                      : "bg-[#FFFCF7]/30 group-hover:bg-[#FFFCF7]/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

      </div>

      {/* Streamlined Quick Booking Bar */}
      <div className="relative z-30 max-w-[1100px] mx-auto px-3 sm:px-6 w-full mt-4">
        <div className="bg-[#FFFCF7]/95 backdrop-blur-xl border border-[#E7DDCE] rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-xl shadow-black/30">
          
          {/* Mobile: 2-column grid + full width book button | Desktop: 5-column single row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 items-center">
            
            {/* Check-In */}
            <div className="px-3 py-1.5 rounded-xl sm:rounded-full bg-[#F6F2EA]/90 border border-[#E7DDCE] text-left">
              <span className="block text-[8px] uppercase tracking-[0.18em] font-bold text-[#6D7168]">
                Check-In
              </span>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-[#1B2E24] focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-Out */}
            <div className="px-3 py-1.5 rounded-xl sm:rounded-full bg-[#F6F2EA]/90 border border-[#E7DDCE] text-left">
              <span className="block text-[8px] uppercase tracking-[0.18em] font-bold text-[#6D7168]">
                Check-Out
              </span>
              <input
                type="date"
                value={quickCheckOut}
                min={quickCheckIn}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-[#1B2E24] focus:outline-none cursor-pointer"
              />
            </div>

            {/* Room / Cottage Select */}
            <div className="px-3 py-1.5 rounded-xl sm:rounded-full bg-[#F6F2EA]/90 border border-[#E7DDCE] text-left">
              <span className="block text-[8px] uppercase tracking-[0.18em] font-bold text-[#6D7168]">
                Option
              </span>
              <select
                value={quickRoom}
                onChange={(e) => setQuickRoom(e.target.value)}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-[#1B2E24] focus:outline-none cursor-pointer truncate"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div className="px-3 py-1.5 rounded-xl sm:rounded-full bg-[#F6F2EA]/90 border border-[#E7DDCE] text-left">
              <span className="block text-[8px] uppercase tracking-[0.18em] font-bold text-[#6D7168]">
                Guests
              </span>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(parseInt(e.target.value, 10))}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-[#1B2E24] focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={6}>6 Guests (Entire Chalet)</option>
              </select>
            </div>

            {/* Instant Book WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppQuickBook}
              className="col-span-2 lg:col-span-1 w-full py-2.5 px-4 rounded-xl sm:rounded-full bg-[#25D366] hover:bg-[#1fb855] text-[#FFFCF7] text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center space-x-1.5 shadow-md transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Instant Check</span>
            </button>

          </div>
        </div>
      </div>

    </section>
  );
}
