"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useHotel } from "@/context/HotelContext";
import { getWhatsAppRawDigits } from "@/lib/formatPhone";

export function Rooms() {
  const hotel = useHotel();
  const rooms = hotel.rooms || [];
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const currentRoom = rooms[activeRoomIndex] || rooms[0] || {};
  const roomPhotos = currentRoom?.galleryImages && currentRoom.galleryImages.length > 0
    ? currentRoom.galleryImages
    : [{ url: currentRoom.image || "/images/client/chalet-golden-hour-front.png", caption: currentRoom.name || "Naka's Cottage" }];

  const whatsappDisplay = (hotel.contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);

  const handleSelectRoom = (index: number) => {
    setActiveRoomIndex(index);
    setActivePhotoIndex(0);
  };

  // Auto-cycle through room photos smoothly every 4.5 seconds
  useEffect(() => {
    if (roomPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % roomPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [roomPhotos.length, activeRoomIndex]);

  return (
    <section
      id="stay"
      aria-labelledby="rooms-heading"
      className="py-24 sm:py-32 bg-[#F6F2EA] relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#B18A5A]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#31483A]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header with Clear, Bold Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="w-8 h-[2px] bg-[#B18A5A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
                Cottage Accommodations &amp; Suites
              </span>
            </div>
            <h2
              id="rooms-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-tight"
            >
              Choose Your Stay Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6D7168] font-normal leading-relaxed max-w-md">
            Every stay includes access to the private swimming pool, sun terrace, lakeside balconies, outdoor barbecue mangal, high-speed Wi-Fi, and smart keypad self check-in.
          </p>
        </div>

        {/* =========================================================================
            FEATURED INTERACTIVE ROOM SHOWCASE (Multi-Photo Gallery with Thumbnails)
           ========================================================================= */}
        <div className="bg-[#FFFCF7] rounded-sm border border-[#E7DDCE] shadow-2xl overflow-hidden mb-16">
          
          {/* Room Selector Tab Bar */}
          <div className="flex border-b border-[#E7DDCE] overflow-x-auto bg-[#F6F2EA]/60">
            {rooms.map((room, idx) => {
              const isSelected = activeRoomIndex === idx;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleSelectRoom(idx)}
                  className={`px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm font-serif transition-all duration-300 text-left border-r border-[#E7DDCE] flex items-center space-x-3 whitespace-nowrap ${
                    isSelected
                      ? "bg-[#FFFCF7] text-[#1B2E24] font-bold border-b-2 border-b-[#B18A5A] shadow-sm"
                      : "text-[#6D7168] hover:text-[#1B2E24] hover:bg-[#FFFCF7]/50"
                  }`}
                >
                  <span className="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#31483A]/10 text-[#31483A] font-bold">
                    0{idx + 1}
                  </span>
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content: Photo Showcase Left (7 cols) + Details Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Interactive Multi-Photo Viewer (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#16221A] flex flex-col justify-between">
              
              {/* Primary Active Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-sm overflow-hidden shadow-inner group">
                <Image
                  src={roomPhotos[activePhotoIndex]?.url || currentRoom.image}
                  alt={roomPhotos[activePhotoIndex]?.caption || currentRoom.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  priority
                />
                
                {/* Image Caption & Index Badge */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs text-[#FFFCF7]">
                  <span className="font-medium tracking-wide drop-shadow">
                    {roomPhotos[activePhotoIndex]?.caption}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm">
                    {activePhotoIndex + 1} / {roomPhotos.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3">
                {roomPhotos.map((photo, pIdx) => {
                  const isThumbActive = activePhotoIndex === pIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setActivePhotoIndex(pIdx)}
                      aria-label={`View photo ${pIdx + 1}: ${photo.caption}`}
                      className={`relative aspect-[4/3] rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                        isThumbActive
                          ? "border-[#B18A5A] scale-102 shadow-md ring-2 ring-[#B18A5A]/50"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Room Specifications & Story (5 cols) */}
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-xs text-[#B18A5A] font-bold uppercase tracking-wider mb-2">
                  <span>{currentRoom.occupancy}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{currentRoom.size}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#1B2E24] font-bold mb-4">
                  {currentRoom.name}
                </h3>

                <p className="text-sm text-[#6D7168] font-normal leading-relaxed mb-6">
                  {currentRoom.description}
                </p>

                {/* Key Inclusions Checklist */}
                {currentRoom.features && (
                  <div className="space-y-2.5 border-t border-b border-[#E7DDCE] py-5 mb-6">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#1B2E24] block mb-3">
                      Included Highlights
                    </span>
                    {currentRoom.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2.5 text-xs text-[#31483A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B18A5A]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Area: Rate & WhatsApp Direct Reservation */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E7DDCE]/60">
                {currentRoom.rate && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6D7168] block font-semibold">
                      Rate per Night
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#31483A]">
                      {currentRoom.rate}
                    </span>
                  </div>
                )}
                <a
                  href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                    `Hello! I want to inquire about booking ${currentRoom.name} at ${hotel.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] rounded-full shadow-md hover:shadow-lg transition-all duration-300"
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

        {/* Room Grid Cards for Quick Overview with Real Image Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, idx) => {
            const isSelected = activeRoomIndex === idx;
            return (
              <div
                key={room.id}
                onClick={() => handleSelectRoom(idx)}
                className={`group rounded-xl overflow-hidden bg-[#FFFCF7] border transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl ${
                  isSelected
                    ? "border-[#B18A5A] ring-2 ring-[#B18A5A]/40 -translate-y-1.5"
                    : "border-[#E7DDCE] hover:border-[#31483A] hover:-translate-y-1"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#16221A]">
                  <Image
                    src={room.image || "/images/client/chalet-golden-hour-front.png"}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFFCF7] text-[10px] uppercase tracking-wider font-bold">
                    0{idx + 1}
                  </div>
                  {room.rate && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#31483A] text-[#FFFCF7] text-xs font-bold shadow-md">
                      {room.rate}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-[11px] text-[#FFFCF7] font-medium tracking-wide">
                    {room.occupancy} &bull; {room.size}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-serif text-lg font-bold text-[#1B2E24] mb-1.5 group-hover:text-[#B18A5A] transition-colors">
                    {room.name}
                  </h4>
                  <p className="text-xs text-[#6D7168] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                  <div className="mt-3 text-[11px] font-bold text-[#B18A5A] uppercase tracking-wider flex items-center space-x-1">
                    <span>View Photos &amp; Specs</span>
                    <span>&rarr;</span>
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
