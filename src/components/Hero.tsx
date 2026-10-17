"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useHotel } from "@/context/HotelContext";
import { getWhatsAppRawDigits } from "@/lib/formatPhone";
import { User, Users, CalendarDays, Star, ChevronDown, ArrowRight } from "lucide-react";

const defaultHeroSlides = [
  {
    url: "/images/client/chalet-golden-hour-front.jpg",
    alt: "Golden hour sunset architecture of Naka's Cottage with private balconies",
    title: "Architectural A-Frame Golden Hour",
    badge: "Architectural A-Frame • Golden Sunset",
    headingLight: "Luxury",
    headingBold: "A-Frame Chalet",
    headingAccent: "with Lake Views",
    description: "Private two-story wooden sanctuary with a pool, panoramic verandas, cozy loft, and authentic Georgian hospitality.",
  },
  {
    url: "/images/client/chalet-lakeview-deck.jpg",
    alt: "Panoramic wooden balcony deck overlooking turquoise Tbilisi lake",
    title: "Panoramic Lake & Mountain Deck",
    badge: "High Wooden Veranda • 180° Vista",
    headingLight: "Panoramic",
    headingBold: "Lakeside Deck",
    headingAccent: "& Mountain Breeze",
    description: "Savor fine Georgian wine on the expansive wooden deck overlooking turquoise waters and peaceful rolling hills.",
  },
  {
    url: "/images/client/chalet-night-illumination.jpg",
    alt: "Naka's Cottage illuminated A-frame chalet at twilight with warm LED contour lighting",
    title: "Night Illumination & Warm Ambiance",
    badge: "Twilight Ambiance • LED Illumination",
    headingLight: "Magical",
    headingBold: "Night Glow",
    headingAccent: "Under Starlit Skies",
    description: "Architectural LED contour lighting and warm timber ambiance designed for romantic, unforgettable evenings.",
  },
  {
    url: "/images/client/chalet-balcony-egg-chair.jpg",
    alt: "Hanging rattan egg chair on wooden balcony facing panoramic lake vista",
    title: "Lakeside Egg Chair Balcony",
    badge: "Upper Veranda • Serene Escape",
    headingLight: "Lakeside",
    headingBold: "Hanging Egg Chair",
    headingAccent: "Above the Water",
    description: "Unwind in the cushioned rattan egg chair with morning coffee, gentle breezes, and panoramic lake tranquility.",
  },
  {
    url: "/images/client/chalet-outdoor-pool.jpg",
    alt: "Private outdoor swimming pool with crystal blue water and lush greenery",
    title: "Private Outdoor Pool & Sun Terrace",
    badge: "Secluded Wellness • Crystal Blue",
    headingLight: "Private",
    headingBold: "Swimming Pool",
    headingAccent: "& Sun Terrace",
    description: "Cool off in crystal-clear waters on your private patio, surrounded by lush green hedges and open mountain skies.",
  },
  {
    url: "/images/client/chalet-pool-loungers.jpg",
    alt: "Private poolside sunloungers patio with privacy hedge and mountain breeze",
    title: "Poolside Sunloungers Patio",
    badge: "Sunbathing Deck • Open-Air Comfort",
    headingLight: "Poolside",
    headingBold: "Sunloungers",
    headingAccent: "& Relaxation Patio",
    description: "Sunbathe in complete seclusion on ergonomic white recliners with open-air views and refreshing mountain winds.",
  },
];

export function Hero() {
  const hotel = useHotel();
  const { rooms, contact } = hotel;
  const [activeSlide, setActiveSlide] = useState(0);
  const [quickCheckIn, setQuickCheckIn] = useState("");
  const [quickCheckOut, setQuickCheckOut] = useState("");
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickRoom, setQuickRoom] = useState(rooms[0]?.id || "entire-a-frame-chalet");

  const whatsappDisplay = (contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);

  const slides = defaultHeroSlides;

  // Auto-animate every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleWhatsAppQuickBook = () => {
    const roomObj = rooms.find((r) => r.id === quickRoom);
    const roomName = roomObj ? roomObj.name : "Entire Private Chalet";
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
      className="px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 bg-[#F6F2EA]"
    >
      {/* Outer Rounded Luxury Frame matching user reference */}
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between p-5 sm:p-8 md:p-12 shadow-2xl border border-[#E7DDCE]">
        
        {/* =========================================================================
            SLIDESHOW BACKGROUND (Clear, crisp high-res natural images with soft vignette)
           ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {slides.map((slide, index) => {
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
                  quality={95}
                  className={`object-cover object-center transform transition-transform duration-[6000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
              </div>
            );
          })}

          {/* Soft, Transparent Natural Vignette (Images stay clearly visible!) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-black/20 pointer-events-none" />
        </div>

        {/* =========================================================================
            TOP BAR: SLIDE BADGE, RATING & VISITOR AVATAR CLUSTER + SLIDE CONTROLS
           ========================================================================= */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pt-2 sm:pt-4">
          {/* Left: Active Slide Caption */}
          <div className="hidden md:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span>{slides[activeSlide]?.title}</span>
          </div>

          {/* Center: Rating & Avatars */}
          <div className="mx-auto md:mx-0 inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
            {/* Frosted Glass User Head & Shoulders Silhouette Icons with Blur */}
            <div className="flex -space-x-2 overflow-hidden shrink-0 items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="relative inline-flex h-7 sm:h-8 px-2 rounded-full border border-white/35 bg-[#31483A]/90 backdrop-blur-md text-white text-[10.5px] font-bold items-center justify-center shadow-xs">
                +29
              </span>
            </div>

            {/* Stars & Text */}
            <div className="text-left">
              <div className="flex items-center space-x-0.5 text-[#F59E0B]">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              </div>
              <span className="text-[10.5px] sm:text-[11.5px] text-white font-medium block mt-0.5 tracking-wide drop-shadow">
                Top-rated by visitors &bull; 4.0 ★ (29 Reviews)
              </span>
            </div>
          </div>

          {/* Right: Interactive Slide Dots & Progress */}
          <div className="hidden sm:inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            <div className="flex items-center space-x-1.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.url}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 rounded-full h-2 ${
                    activeSlide === idx
                      ? "w-6 bg-white shadow-sm"
                      : "w-2 bg-white/45 hover:bg-white/80 cursor-pointer"
                  }`}
                  aria-label={`Slide ${idx + 1}: ${slide.title}`}
                  title={slide.title}
                />
              ))}
            </div>
            <span className="text-[11px] text-white/90 font-mono font-medium pl-1">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* =========================================================================
            CENTER: DYNAMICALLY ANIMATED TYPOGRAPHY BASED ON ACTIVE BANNER SLIDE
           ========================================================================= */}
        <div className="relative z-20 max-w-3xl mx-auto text-center my-auto py-5 sm:py-7">
          <div
            key={activeSlide}
            className="animate-hero-text-swap flex flex-col items-center"
          >
            {/* Dynamic Slide Category Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-[#E7DDCE] text-[10.5px] uppercase tracking-[0.2em] font-semibold mb-3 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B18A5A]" />
              <span>{slides[activeSlide]?.badge}</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-3 drop-shadow-lg">
              <span className="font-light block">{slides[activeSlide]?.headingLight}</span>
              <span className="font-extrabold block">{slides[activeSlide]?.headingBold}</span>
              <span className="font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl block text-white/95 mt-1">
                {slides[activeSlide]?.headingAccent}
              </span>
            </h1>

            <p className="text-xs xs:text-sm sm:text-base text-white/95 font-normal leading-relaxed max-w-xl mx-auto drop-shadow-md">
              {slides[activeSlide]?.description}
            </p>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM: FLOATING CLEAN BOOKING CARD (With Lucide Library Icons)
           ========================================================================= */}
        {/* =========================================================================
            BOTTOM: LUXURY FLOATING SEGMENTED BOOKING PILL (Belmond / Airbnb Luxe Style)
           ========================================================================= */}
        <div className="relative z-20 max-w-4xl mx-auto w-full">
          <div className="bg-[#FFFCF7]/95 backdrop-blur-xl text-[#1B2E24] rounded-[24px] sm:rounded-full p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border-2 border-white/90">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-1">
              
              {/* Field 1: Guests Segment */}
              <div className="relative group/guests flex items-center px-4 py-2.5 sm:py-2 rounded-2xl sm:rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center shrink-0 mr-3 border border-[#E7DDCE]">
                  <Users className="w-4 h-4 text-[#31483A]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C]">
                    Guests
                  </span>
                  <span className="block text-xs sm:text-[13px] font-bold text-[#1B2E24] truncate">
                    {quickGuests === 1
                      ? "1 Guest"
                      : quickGuests === 2
                      ? "2 Guests (Couple)"
                      : quickGuests <= 4
                      ? `${quickGuests} Guests`
                      : "6 Guests (Entire Chalet)"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#8A7E72] group-hover/guests:text-[#1B2E24] transition-colors shrink-0 ml-1.5" />
                <select
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(parseInt(e.target.value, 10))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title="Select number of guests"
                >
                  <option value={1}>1 Guest (Solo Traveler)</option>
                  <option value={2}>2 Guests (Couple / Romantic Stay)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Family / Friends)</option>
                  <option value={6}>6 Guests (Entire Private Chalet)</option>
                </select>
              </div>

              {/* Vertical Hairline Divider */}
              <div className="hidden sm:block h-9 w-[1px] bg-[#E7DDCE]" />

              {/* Field 2: Dates Segment */}
              <div className="relative group/dates flex items-center px-4 py-2.5 sm:py-2 rounded-2xl sm:rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center shrink-0 mr-3 border border-[#E7DDCE]">
                  <CalendarDays className="w-4 h-4 text-[#31483A]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C]">
                    Dates
                  </span>
                  <span className="block text-xs sm:text-[13px] font-bold text-[#1B2E24] truncate">
                    {quickCheckIn && quickCheckOut
                      ? `${quickCheckIn} — ${quickCheckOut}`
                      : quickCheckIn
                      ? `From ${quickCheckIn}`
                      : "Add check-in & check-out"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#8A7E72] group-hover/dates:text-[#1B2E24] transition-colors shrink-0 ml-1.5" />
                {/* Transparent overlays for seamless native datepicker interaction */}
                <div className="absolute inset-0 opacity-0 flex cursor-pointer">
                  <input
                    type="date"
                    value={quickCheckIn}
                    onChange={(e) => setQuickCheckIn(e.target.value)}
                    className="w-1/2 h-full cursor-pointer"
                    title="Select check-in date"
                  />
                  <input
                    type="date"
                    value={quickCheckOut}
                    min={quickCheckIn}
                    onChange={(e) => setQuickCheckOut(e.target.value)}
                    className="w-1/2 h-full cursor-pointer"
                    title="Select check-out date"
                  />
                </div>
              </div>

              {/* Vertical Hairline Divider */}
              <div className="hidden sm:block h-9 w-[1px] bg-[#E7DDCE]" />

              {/* Field 3: WhatsApp Action CTA Button */}
              <div className="p-1 sm:p-0">
                <button
                  type="button"
                  onClick={handleWhatsAppQuickBook}
                  className="w-full sm:w-auto h-full min-h-[48px] px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#1E3327] via-[#2A4736] to-[#1E3327] hover:from-[#17281E] hover:to-[#22392B] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shrink-0 border border-white/20 group/btn"
                >
                  <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <span className="font-bold tracking-wider">Book on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

          {/* Micro-assurances below search bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-white/90 font-medium drop-shadow-md">
            <span className="inline-flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Host Rates</span>
            </span>
            <span className="hidden sm:inline opacity-60">&bull;</span>
            <span>No Hidden Booking Fees</span>
            <span className="hidden sm:inline opacity-60">&bull;</span>
            <span>Instant Confirmation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
