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
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [datesDropdownOpen, setDatesDropdownOpen] = useState(false);

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
      className="px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-4 sm:pb-6 bg-[#F6F2EA]"
    >
      {/* Outer Rounded Luxury Frame matching user reference */}
      <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[76vh] sm:min-h-[88vh] flex flex-col justify-between pt-3.5 px-3.5 pb-2 xs:pb-3 sm:pt-8 sm:px-8 sm:pb-4 md:pt-10 md:px-12 md:pb-6 shadow-2xl border border-[#E7DDCE]">

        {/* =========================================================================
            SLIDESHOW BACKGROUND (Clear, crisp high-res natural images with soft vignette)
           ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {slides.map((slide, index) => {
            const isActive = activeSlide === index;
            return (
              <div
                key={slide.url}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
                  className={`object-cover object-center transform transition-transform duration-[6000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                    }`}
                />
              </div>
            );
          })}

          {/* Soft, Transparent Natural Vignette (Images stay clearly visible!) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-black/20 pointer-events-none" />
        </div>

        {/* =========================================================================
            TOP: COMPACT REVIEWS & VISITOR AVATAR PILL (Sleek on mobile & desktop)
           ========================================================================= */}
        <div className="relative z-20 flex items-center justify-center pt-1 sm:pt-2">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
            {/* Frosted Glass User Silhouette Icons with Blur */}
            <div className="flex -space-x-1.5 sm:-space-x-2 overflow-hidden shrink-0 items-center">
              <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/35 flex items-center justify-center text-white/95 shadow-xs">
                <User className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>

            {/* Stars & Text */}
            <div className="text-left">
              <div className="flex items-center space-x-0.5 text-[#F59E0B]">
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              </div>
              <span className="text-[9.5px] sm:text-[11.5px] text-white font-medium block mt-0.5 tracking-wide drop-shadow">
                Top-rated by visitors &bull; 4.0 ★
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CENTER: DYNAMICALLY ANIMATED TYPOGRAPHY BASED ON ACTIVE BANNER SLIDE
           ========================================================================= */}
        <div className="relative z-20 max-w-3xl mx-auto text-center my-auto py-3 sm:py-8">
          <div
            key={activeSlide}
            className="animate-hero-text-swap flex flex-col items-center"
          >
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
            BOTTOM: LUXURY FLOATING SEGMENTED BOOKING PILL (Belmond / Airbnb Luxe Style)
           ========================================================================= */}
        <div className="relative z-30 max-w-4xl mx-auto w-full mt-auto">
          {/* Backdrop click to dismiss dropdowns */}
          {(guestsDropdownOpen || datesDropdownOpen) && (
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
              onClick={() => {
                setGuestsDropdownOpen(false);
                setDatesDropdownOpen(false);
              }}
            />
          )}

          <div className="relative z-50 bg-[#FFFCF7]/95 backdrop-blur-xl text-[#1B2E24] rounded-[20px] sm:rounded-full p-1.5 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border-2 border-white/90">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-1">

              {/* Mobile 2-column grid for Guests & Dates */}
              <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-1 sm:items-center sm:gap-1">
                {/* Field 1: Guests Segment */}
                <div className="relative flex-1 min-w-0">
                  <div
                    onClick={() => {
                      setGuestsDropdownOpen(!guestsDropdownOpen);
                      setDatesDropdownOpen(false);
                    }}
                    className="group/guests flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer w-full"
                  >
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center shrink-0 mr-2 sm:mr-3 border border-[#E7DDCE]">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#31483A]" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C]">
                        Guests
                      </span>
                      <span className="block text-[11px] sm:text-[13px] font-bold text-[#1B2E24] truncate">
                        {quickGuests === 1
                          ? "1 Guest"
                          : quickGuests === 2
                            ? "2 Guests"
                            : `${quickGuests} Guests`}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8A7E72] group-hover/guests:text-[#1B2E24] transition-transform duration-200 shrink-0 ml-1 ${guestsDropdownOpen ? "rotate-180 text-[#1B2E24]" : ""}`} />
                  </div>

                  {/* Custom Luxury Guests Popover */}
                  {guestsDropdownOpen && (
                    <div className="absolute bottom-full left-0 mb-2 z-50 w-72 max-w-[calc(100vw-3rem)] sm:w-80 bg-[#FFFCF7] rounded-[24px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-[#E7DDCE]">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E7DDCE] mb-4">
                        <div>
                          <h4 className="font-bold text-sm text-[#1B2E24]">Select Guests</h4>
                          <span className="text-[11px] text-[#6D7168]">Up to 6 guests max</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setQuickGuests(Math.max(1, quickGuests - 1))}
                            className="w-8 h-8 rounded-full border border-[#E7DDCE] bg-[#F6F2EA] hover:bg-[#31483A] hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-base w-6 text-center text-[#1B2E24]">
                            {quickGuests}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuickGuests(Math.min(6, quickGuests + 1))}
                            className="w-8 h-8 rounded-full border border-[#E7DDCE] bg-[#F6F2EA] hover:bg-[#31483A] hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Quick Presets */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { label: "1 Guest", val: 1 },
                          { label: "2 Guests (Couple)", val: 2 },
                          { label: "4 Guests (Family)", val: 4 },
                          { label: "6 Guests (Full)", val: 6 },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setQuickGuests(item.val)}
                            className={`px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all ${quickGuests === item.val
                                ? "bg-[#31483A] text-white border-[#31483A]"
                                : "bg-[#F6F2EA]/60 text-[#1B2E24] border-[#E7DDCE] hover:border-[#B18A5A]"
                              }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setGuestsDropdownOpen(false)}
                        className="w-full py-2.5 rounded-full bg-[#1B2E24] hover:bg-[#31483A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {/* Vertical Hairline Divider for sm+ */}
                <div className="hidden sm:block h-9 w-[1px] bg-[#E7DDCE]" />

                {/* Field 2: Dates Segment */}
                <div className="relative flex-1 min-w-0">
                  <button
                    type="button"
                    aria-expanded={datesDropdownOpen}
                    aria-controls="hero-stay-dates"
                    onClick={() => {
                      setDatesDropdownOpen(!datesDropdownOpen);
                      setGuestsDropdownOpen(false);
                    }}
                    className="group/dates flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer w-full"
                  >
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center shrink-0 mr-2 sm:mr-3 border border-[#E7DDCE]">
                      <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#31483A]" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C]">
                        Dates
                      </span>
                      <span className="block text-[11px] sm:text-[13px] font-bold text-[#1B2E24] truncate">
                        {quickCheckIn && quickCheckOut
                          ? `${quickCheckIn.slice(5)} - ${quickCheckOut.slice(5)}`
                          : quickCheckIn
                            ? quickCheckIn
                            : "Add dates"}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8A7E72] group-hover/dates:text-[#1B2E24] transition-transform duration-200 shrink-0 ml-1 ${datesDropdownOpen ? "rotate-180 text-[#1B2E24]" : ""}`} />
                  </button>

                  {/* Custom Luxury Dates Popover */}
                  {datesDropdownOpen && (
                    <div id="hero-stay-dates" role="region" aria-label="Stay dates" className="absolute bottom-full right-0 mb-2 z-50 w-72 sm:w-[340px] max-w-[calc(100vw-2.5rem)] max-h-[70dvh] overflow-y-auto bg-[#FFFCF7] rounded-[24px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-[#E7DDCE]">
                      <div className="pb-3 border-b border-[#E7DDCE] mb-4">
                        <h4 className="font-bold text-sm text-[#1B2E24]">Stay Dates</h4>
                        <span className="text-[11px] text-[#6D7168]">Select your arrival &amp; departure</span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C] mb-1">
                            Check-in Date
                          </label>
                          <input
                            type="date"
                            value={quickCheckIn}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              setQuickCheckIn(e.target.value);
                              if (quickCheckOut && e.target.value >= quickCheckOut) {
                                const nextDay = new Date(e.target.value);
                                nextDay.setDate(nextDay.getDate() + 1);
                                setQuickCheckOut(nextDay.toISOString().split("T")[0]);
                              }
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DDCE] bg-[#F6F2EA] text-xs font-semibold text-[#1B2E24] focus:outline-none focus:border-[#31483A]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#7D766C] mb-1">
                            Check-out Date
                          </label>
                          <input
                            type="date"
                            value={quickCheckOut}
                            min={quickCheckIn || new Date().toISOString().split("T")[0]}
                            onChange={(e) => setQuickCheckOut(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DDCE] bg-[#F6F2EA] text-xs font-semibold text-[#1B2E24] focus:outline-none focus:border-[#31483A]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setQuickCheckIn("");
                            setQuickCheckOut("");
                          }}
                          className="px-4 py-2.5 rounded-full border border-[#E7DDCE] text-xs font-semibold text-[#6D7168] hover:text-[#1B2E24] hover:bg-[#F6F2EA] transition-colors cursor-pointer shrink-0"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={() => setDatesDropdownOpen(false)}
                          className="flex-1 py-2.5 px-4 rounded-full bg-[#1B2E24] hover:bg-[#31483A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer whitespace-nowrap text-center"
                        >
                          Apply Dates
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Hairline Divider for sm+ */}
              <div className="hidden sm:block h-9 w-[1px] bg-[#E7DDCE]" />

              {/* Field 3: WhatsApp Action CTA Button */}
              <div className="p-0.5 sm:p-0">
                <button
                  type="button"
                  onClick={handleWhatsAppQuickBook}
                  className="w-full sm:w-auto h-full min-h-[42px] sm:min-h-[48px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#1E3327] via-[#2A4736] to-[#1E3327] hover:from-[#17281E] hover:to-[#22392B] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shrink-0 border border-white/20 group/btn"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-110 transition-transform">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <span className="font-bold tracking-wider">Book on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
