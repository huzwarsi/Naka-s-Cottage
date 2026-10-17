"use client";

import { useHotel } from "@/context/HotelContext";
import { formatPhoneNumber } from "@/lib/formatPhone";

export function Footer() {
  const hotel = useHotel();
  const { name, location, contact } = hotel;
  const currentYear = 2026;

  const whatsappDisplay = (contact as any)?.whatsappNumber || "03132220567";
  const cleanDigits = whatsappDisplay.replace(/[^0-9]/g, "");
  const whatsappRaw = cleanDigits.startsWith("0") ? "92" + cleanDigits.slice(1) : cleanDigits;
  const formattedPhone = formatPhoneNumber(whatsappDisplay);

  return (
    <footer className="bg-[#22352A] text-[#FFFCF7] pt-16 sm:pt-20 pb-12 border-t border-[#31483A]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-[#31483A]">

          {/* Brand Info (5 cols) */}
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFCF7] font-bold tracking-wide">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFCF7]/85 font-normal leading-relaxed max-w-sm">
              Twelve luxury architectural private villas featuring private heated swimming pools, floor-to-ceiling glass, and panoramic mountain views. Includes complimentary gourmet breakfast and private 4x4 airport transfers.
            </p>
            <p className="text-xs text-[#FFFCF7]/70 font-medium">
              {location.displayAddress}
            </p>
          </div>

          {/* Navigation Anchors (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B18A5A] block mb-4">
              Quick Links
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#FFFCF7]/90 font-medium">
              <li>
                <a href="#stay" className="hover:text-[#B18A5A] transition-colors">
                  Luxury Villas
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#B18A5A] transition-colors">
                  Amenities &amp; Dining
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B18A5A] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#B18A5A] transition-colors">
                  Location &amp; Directions
                </a>
              </li>
              <li>
                <a href="#inquire" className="hover:text-[#B18A5A] transition-colors">
                  Reserve Villa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B18A5A] block mb-4">
              Reservations &amp; Enquiries
            </span>
            <div className="space-y-3 text-xs text-[#FFFCF7]/85">
              <div>
                <span className="block text-[#FFFCF7]/60 text-[10px] uppercase tracking-wider font-semibold">Instant Booking</span>
                <a
                  href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                    `Hello! I want to book a villa at ${name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-1 px-3 py-1.5 rounded-full bg-[#25D366] text-[#FFFCF7] font-bold text-xs hover:bg-[#1fb855] transition-colors"
                >
                  <span>WhatsApp: {formattedPhone}</span>
                </a>
              </div>
              {contact.email && (
                <p>
                  <span className="block text-[#FFFCF7]/60 text-[10px] uppercase tracking-wider font-semibold">Email</span>
                  <a href={`mailto:${contact.email}`} className="text-[#FFFCF7] hover:text-[#B18A5A] transition-colors font-medium">
                    {contact.email}
                  </a>
                </p>
              )}
              {(contact.phone || formattedPhone) && (
                <p>
                  <span className="block text-[#FFFCF7]/60 text-[10px] uppercase tracking-wider font-semibold">Phone</span>
                  <a href={`tel:${(contact.phone || formattedPhone).replace(/\s+/g, "")}`} className="text-[#FFFCF7] hover:text-[#B18A5A] transition-colors font-medium">
                    {formatPhoneNumber(contact.phone) || formattedPhone}
                  </a>
                </p>
              )}
              {contact.hours && (
                <p className="text-[11px] text-[#FFFCF7]/60 pt-1">
                  {contact.hours}
                </p>
              )}
            </div>

            {/* Social links (only if provided in config) */}
            {contact.socialLinks && Object.keys(contact.socialLinks).length > 0 && (
              <div className="pt-3">
                <span className="block text-[#FFFCF7]/50 text-[10px] uppercase tracking-wider mb-2">Follow</span>
                <div className="flex space-x-4 text-xs">
                  {contact.socialLinks.instagram && (
                    <a
                      href={contact.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFCF7]/80 hover:text-[#B18A5A] transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {contact.socialLinks.facebook && (
                    <a
                      href={contact.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFCF7]/80 hover:text-[#B18A5A] transition-colors"
                    >
                      Facebook
                    </a>
                  )}
                  {contact.socialLinks.linkedin && (
                    <a
                      href={contact.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFCF7]/80 hover:text-[#B18A5A] transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFCF7]/60 gap-4">
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          <p className="font-light tracking-wide">
            {location.region}, {location.country} &bull; Luxury Architectural Chalets &amp; Villas
          </p>
        </div>

      </div>
    </footer>
  );
}
