"use client";

import { useHotel } from "@/context/HotelContext";
import { formatPhoneNumber, getWhatsAppRawDigits } from "@/lib/formatPhone";

export function Footer() {
  const hotel = useHotel();
  const { name, location, contact, hero } = hotel;
  const currentYear = 2026;

  const whatsappDisplay = (contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);
  const formattedPhone = formatPhoneNumber(whatsappDisplay);

  return (
    <footer className="bg-[#1C2C22] text-[#FFFCF7] pt-12 sm:pt-16 pb-10 border-t border-[#31483A]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#31483A]/70">

          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl text-[#FFFCF7] font-bold tracking-wide">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFCF7]/80 font-normal leading-relaxed max-w-sm">
              {hero.description || "Private architectural A-frame chalet featuring an outdoor swimming pool, lakeside balconies, modern kitchen, and scenic Tbilisi mountain views."}
            </p>
            <p className="text-[11px] sm:text-xs text-[#FFFCF7]/65 font-medium">
              {location.displayAddress}
            </p>
          </div>

          {/* Navigation Anchors (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B18A5A] block mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#FFFCF7]/85 font-medium">
              <li>
                <a href="#stay" className="hover:text-[#B18A5A] transition-colors">
                  Cottage &amp; Rooms
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#B18A5A] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#B18A5A] transition-colors">
                  Amenities &amp; Pool
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B18A5A] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#B18A5A] transition-colors">
                  Directions &amp; Map
                </a>
              </li>
              <li>
                <a href="#inquire" className="hover:text-[#B18A5A] transition-colors">
                  Direct Reservation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B18A5A] block mb-3">
              Direct Contact
            </span>
            <div className="space-y-2.5 text-xs text-[#FFFCF7]/85">
              <div>
                <span className="block text-[#FFFCF7]/55 text-[9px] uppercase tracking-wider font-semibold">Direct Booking</span>
                <a
                  href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                    `Hello! I want to check availability at ${name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 mt-1 px-3 py-1.5 rounded-full bg-[#25D366] text-[#FFFCF7] font-bold text-xs hover:bg-[#1fb855] transition-colors shadow-sm"
                >
                  <span>WhatsApp: {formattedPhone}</span>
                </a>
              </div>
              {contact.email && (
                <p>
                  <span className="block text-[#FFFCF7]/55 text-[9px] uppercase tracking-wider font-semibold">Email</span>
                  <a href={`mailto:${contact.email}`} className="text-[#FFFCF7] hover:text-[#B18A5A] transition-colors font-medium">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.hours && (
                <p className="text-[11px] text-[#FFFCF7]/65 pt-1">
                  {contact.hours}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFCF7]/60 gap-3 text-center sm:text-left">
          <p>&copy; {currentYear} {name}. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#stay" className="hover:text-[#FFFCF7] transition-colors">Rooms</a>
            <span aria-hidden="true">&bull;</span>
            <a href="#inquire" className="hover:text-[#FFFCF7] transition-colors">Reservations</a>
            <span aria-hidden="true">&bull;</span>
            <a href="#location" className="hover:text-[#FFFCF7] transition-colors">Location</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
