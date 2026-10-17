"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useHotel } from "@/context/HotelContext";
import { getWhatsAppRawDigits } from "@/lib/formatPhone";
import { Play, Pause, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

export function Rooms() {
  const hotel = useHotel();
  const rooms = hotel.rooms || [];
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const currentRoom = rooms[activeRoomIndex] || rooms[0] || {};
  const roomPhotos =
    currentRoom?.galleryImages && currentRoom.galleryImages.length > 0
      ? currentRoom.galleryImages
      : [
          {
            url: currentRoom.image || "/images/client/chalet-golden-hour-front.png",
            caption: currentRoom.name || "Naka's Cottage",
          },
        ];

  const whatsappDisplay = (hotel.contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);

  const handleSelectRoom = (index: number) => {
    setActiveRoomIndex(index);
    setActivePhotoIndex(0);
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % roomPhotos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + roomPhotos.length) % roomPhotos.length);
  };

  // Scroll filmstrip to active thumbnail (internal container scroll only - NEVER scrolls window)
  useEffect(() => {
    if (filmstripRef.current) {
      const container = filmstripRef.current;
      const activeThumb = container.children[activePhotoIndex] as HTMLElement;
      if (activeThumb) {
        const targetScroll =
          activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    }
  }, [activePhotoIndex]);

  // Auto-cycle through room photos smoothly every 4.5 seconds with pause/play
  useEffect(() => {
    if (!isPlaying || roomPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % roomPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, roomPhotos.length, activeRoomIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, roomPhotos.length]);

  return (
    <section
      id="stay"
      aria-labelledby="rooms-heading"
      className="py-16 sm:py-24 bg-[#F6F2EA] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#B18A5A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#31483A]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
                Cottage Accommodations &amp; Gallery
              </span>
            </div>
            <h2
              id="rooms-heading"
              className="text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight tracking-tight"
            >
              Choose Your Stay Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed max-w-md">
            Browse high-resolution photographs of Naka’s Cottage, the private swimming pool, timber loft suite, and lake panorama verandas.
          </p>
        </div>

        {/* =========================================================================
            10X ARCHITECTURAL PHOTO SHOWCASE STAGE
           ========================================================================= */}
        {/* =========================================================================
            10X ARCHITECTURAL PHOTO SHOWCASE STAGE
           ========================================================================= */}
        <div className="bg-[#FFFCF7] rounded-[28px] sm:rounded-[36px] border border-[#E7DDCE] shadow-2xl overflow-hidden mb-12 sm:mb-16">
          
          {/* Room Selector Tab Bar */}
          <div className="flex border-b border-[#E7DDCE] overflow-x-auto no-scrollbar bg-[#F6F2EA]/80">
            {rooms.map((room, idx) => {
              const isSelected = activeRoomIndex === idx;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleSelectRoom(idx)}
                  className={`px-5 sm:px-8 py-3.5 sm:py-4.5 text-xs sm:text-sm font-semibold transition-all duration-300 text-left border-r border-[#E7DDCE] flex items-center space-x-2.5 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "bg-[#FFFCF7] text-[#1B2E24] border-b-2 border-b-[#B18A5A] shadow-xs"
                      : "text-[#6D7168] hover:text-[#1B2E24] hover:bg-[#FFFCF7]/50"
                  }`}
                >
                  <span
                    className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-[#31483A] text-white"
                        : "bg-[#31483A]/10 text-[#31483A]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Stage Grid: Interactive Gallery Left (7 cols) + Room Specs Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: 10x Interactive High-Res Gallery Showcase (7 cols) */}
            <div className="lg:col-span-7 p-3.5 xs:p-5 sm:p-6 md:p-8 bg-[#14231A] flex flex-col justify-between relative overflow-hidden">
              
              {/* Top Controls Header (Fully Responsive on All Screen Sizes) */}
              <div className="flex items-center justify-between text-xs text-[#FFFCF7]/90 mb-3 z-10 px-0.5 sm:px-1 gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[9.5px] xs:text-[10px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase text-[#E7DDCE] whitespace-nowrap">
                    <span className="hidden xs:inline">Interactive </span>Gallery
                  </span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-2 xs:px-2.5 sm:px-3 py-1 rounded-full bg-[#1B2E24]/80 hover:bg-[#31483A] text-[9px] xs:text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 sm:space-x-1.5 text-white border border-[#E7DDCE]/30 backdrop-blur-md cursor-pointer shadow-sm active:scale-95 shrink-0"
                    title={isPlaying ? "Pause auto slide" : "Play auto slide"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current shrink-0" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current shrink-0" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="px-2 xs:px-2.5 sm:px-3 py-1 rounded-full bg-[#1B2E24]/80 hover:bg-[#31483A] text-[9px] xs:text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 sm:space-x-1.5 text-white border border-[#E7DDCE]/30 backdrop-blur-md cursor-pointer shadow-sm active:scale-95 shrink-0"
                    title="Open Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                    <span>Full View</span>
                  </button>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-[#1B2E24]/80 text-[#E7DDCE] border border-[#E7DDCE]/30 backdrop-blur-md shrink-0">
                    0{activePhotoIndex + 1} / 0{roomPhotos.length}
                  </span>
                </div>
              </div>

              {/* Main Photo Cinema Stage with Warm Luxury Curves & Refined Linen/Brass Border */}
              <div
                className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[20px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#B18A5A]/35 group cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                {/* 1. Crisp Full-Bleed High-Res Image */}
                <Image
                  key={roomPhotos[activePhotoIndex]?.url}
                  src={roomPhotos[activePhotoIndex]?.url || currentRoom.image}
                  alt={roomPhotos[activePhotoIndex]?.caption || currentRoom.name}
                  fill
                  quality={95}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                />

                {/* 2. Soft Natural Luxury Vignette Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/15 pointer-events-none" />

                {/* Floating Chevron Left Navigation Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#14231A]/80 hover:bg-[#B18A5A] text-white flex items-center justify-center backdrop-blur-md border border-[#E7DDCE]/30 transition-all opacity-90 group-hover:opacity-100 shadow-xl hover:scale-105 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Floating Chevron Right Navigation Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPhoto();
                  }}
                  className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#14231A]/80 hover:bg-[#B18A5A] text-white flex items-center justify-center backdrop-blur-md border border-[#E7DDCE]/30 transition-all opacity-90 group-hover:opacity-100 shadow-xl hover:scale-105 cursor-pointer"
                  aria-label="Next photo"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-5 flex items-end justify-between gap-2">
                  <div className="max-w-[78%] xs:max-w-[85%]">
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-[#E7DDCE] mb-0.5">
                      Naka’s Cottage Showcase
                    </span>
                    <h4 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-md leading-tight line-clamp-1 xs:line-clamp-none">
                      {roomPhotos[activePhotoIndex]?.caption}
                    </h4>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#E7DDCE] bg-[#14231A]/80 border border-[#E7DDCE]/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-md shrink-0 font-medium shadow-sm">
                    Zoom
                  </span>
                </div>

                {/* Animated auto-advance progress line */}
                {isPlaying && (
                  <div
                    key={`progress-${activePhotoIndex}`}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#B18A5A] z-30"
                    style={{
                      animation: "progressFill 4.5s linear forwards",
                    }}
                  />
                )}
              </div>

              {/* Filmstrip Carousel: Smooth Rounded Curves with Warm Brass / Linen Borders */}
              <div className="mt-4 pt-2">
                <div className="flex items-center justify-between text-[11px] text-[#E7DDCE] mb-2 px-1">
                  <span className="font-semibold tracking-wide">
                    All Spaces &amp; Details ({roomPhotos.length} Photos)
                  </span>
                  <span className="text-[10px] text-[#E7DDCE]/70">
                    Tap any photo to view
                  </span>
                </div>

                {/* Filmstrip Row with Smooth Scrolling */}
                <div
                  ref={filmstripRef}
                  className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-0.5 scroll-smooth"
                >
                  {roomPhotos.map((photo, pIdx) => {
                    const isThumbActive = activePhotoIndex === pIdx;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setActivePhotoIndex(pIdx);
                          setIsPlaying(false);
                        }}
                        className={`group/thumb relative w-20 sm:w-24 aspect-[4/3] rounded-[16px] sm:rounded-[20px] overflow-hidden shrink-0 border transition-all duration-300 focus:outline-none cursor-pointer ${
                          isThumbActive
                            ? "border-[#B18A5A] ring-2 ring-[#B18A5A]/60 scale-103 shadow-lg opacity-100"
                            : "border-[#E7DDCE]/25 opacity-65 hover:opacity-100 hover:border-[#B18A5A]/60"
                        }`}
                        title={photo.caption}
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                        {/* Number Tag */}
                        <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded-md bg-[#14231A]/85 backdrop-blur-xs text-[9px] font-mono text-[#E7DDCE] border border-[#B18A5A]/35">
                          0{pIdx + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right: Room Specifications & Direct Booking (5 cols) */}
            <div className="lg:col-span-5 p-5 sm:p-8 md:p-9 flex flex-col justify-between bg-[#FFFCF7]">
              <div>
                <div className="flex items-center space-x-2 text-[11px] text-[#B18A5A] font-bold uppercase tracking-wider mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#B18A5A]/15 text-[#B18A5A]">
                    {currentRoom.occupancy}
                  </span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{currentRoom.size}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl text-[#1B2E24] font-bold mb-3 tracking-tight">
                  {currentRoom.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#6D7168] font-normal leading-relaxed mb-6">
                  {currentRoom.description}
                </p>

                {/* Key Inclusions Checklist */}
                {currentRoom.features && (
                  <div className="border-t border-b border-[#E7DDCE] py-4 mb-6 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#1B2E24] block mb-2.5">
                      Included Private Amenities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentRoom.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center space-x-2 text-xs text-[#31483A] font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B18A5A] shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Area: Rate & WhatsApp Direct Reservation */}
              <div className="pt-4 flex flex-col xs:flex-row xs:items-center justify-between gap-4 border-t border-[#E7DDCE]">
                {currentRoom.rate && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#6D7168] block font-semibold">
                      Live Rate per Night
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#31483A]">
                      {currentRoom.rate}
                    </span>
                  </div>
                )}
                <a
                  href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                    `Hello! I want to check availability and book ${currentRoom.name} at ${hotel.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] rounded-full shadow-md hover:shadow-lg transition-all duration-300 w-full xs:w-auto"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Book on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Overview Cards Grid for Quick Switching */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {rooms.map((room, idx) => {
            const isSelected = activeRoomIndex === idx;
            return (
              <div
                key={room.id}
                onClick={() => handleSelectRoom(idx)}
                className={`group rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#FFFCF7] border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl ${
                  isSelected
                    ? "border-[#B18A5A] ring-2 ring-[#B18A5A]/30 -translate-y-1"
                    : "border-[#E7DDCE] hover:border-[#B18A5A]"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#16221A]">
                  <Image
                    src={room.image || "/images/client/chalet-golden-hour-front.jpg"}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFCF7] text-[9px] uppercase tracking-wider font-bold border border-white/20">
                    0{idx + 1}
                  </div>
                  {room.rate && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#31483A] text-[#FFFCF7] text-xs font-bold shadow-sm border border-[#E7DDCE]/30">
                      {room.rate}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-65" />
                  <div className="absolute bottom-3 left-3 text-[11px] text-[#FFFCF7] font-medium tracking-wide">
                    {room.occupancy} &bull; {room.size}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="text-base sm:text-lg font-bold text-[#1B2E24] mb-1.5 group-hover:text-[#B18A5A] transition-colors truncate">
                    {room.name}
                  </h4>
                  <p className="text-xs text-[#6D7168] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                  <div className="mt-3 text-[10.5px] font-bold text-[#B18A5A] uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Explore Gallery &amp; Inclusions</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          HIGH-RESOLUTION FULLSCREEN LIGHTBOX FOR ROOM PHOTOS
         ========================================================================= */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution photo viewer"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shadow-lg"
            aria-label="Close photo viewer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shadow-lg flex items-center justify-center"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shadow-lg flex items-center justify-center"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered High-Res Image Container */}
          <div
            className="relative w-full max-w-5xl h-[75vh] sm:h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={roomPhotos[activePhotoIndex]?.url || currentRoom.image}
                alt={roomPhotos[activePhotoIndex]?.caption || currentRoom.name}
                fill
                quality={100}
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption */}
            <div className="w-full mt-3 flex items-center justify-between text-white text-xs px-2">
              <span className="font-semibold text-sm sm:text-base text-white/90 truncate max-w-[70%]">
                {roomPhotos[activePhotoIndex]?.caption}
              </span>
              <span className="text-xs font-mono text-white/60">
                {activePhotoIndex + 1} / {roomPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
