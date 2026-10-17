"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useHotel } from "@/context/HotelContext";
import { getWhatsAppRawDigits } from "@/lib/formatPhone";

export function Header() {
  const hotelConfig = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappDisplay = (hotelConfig.contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = getWhatsAppRawDigits(whatsappDisplay);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Cottage & Rooms", href: "#stay" },
    { label: "Story", href: "#story" },
    { label: "Amenities", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header className="fixed top-2.5 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-[1240px] mx-auto pointer-events-auto rounded-full transition-all duration-500 px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-[#FFFCF7]/95 backdrop-blur-md shadow-xl border-[#D8C7B2]"
            : "bg-[#FFFCF7]/92 backdrop-blur-sm shadow-md border-[#E7DDCE]"
        }`}
      >
        {/* Brand Wordmark */}
        <Link
          href="#"
          className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31483A] rounded-sm max-w-[170px] xs:max-w-[210px] sm:max-w-none"
          aria-label={hotelConfig.name}
        >
          <span className="font-serif text-base sm:text-lg md:text-xl tracking-wide text-[#1B2E24] font-bold group-hover:text-[#B18A5A] transition-colors leading-tight truncate">
            {hotelConfig.name}
          </span>
          <span className="text-[8px] sm:text-[9.5px] tracking-[0.2em] uppercase text-[#6D7168] font-semibold -mt-0.5 truncate">
            {hotelConfig.location.region || hotelConfig.location.country}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] lg:text-xs uppercase tracking-[0.18em] font-semibold text-[#1B2E24]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#1B2E24]/90 hover:text-[#B18A5A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B18A5A] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          <a
            href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
              `Hello! I want to check availability and rates at ${hotelConfig.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-2 text-[10px] sm:text-xs uppercase tracking-[0.14em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="hidden xs:inline">Book</span>
            <span className="xs:hidden">Chat</span>
          </a>

          <a
            href="#inquire"
            className="hidden sm:inline-flex shimmer-btn items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            Inquire
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1B2E24] hover:text-[#B18A5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31483A] rounded-full"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span
                className={`h-[2px] bg-current transition-transform duration-200 origin-left ${
                  mobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              />
              <span
                className={`h-[2px] bg-current transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[2px] bg-current transition-transform duration-200 origin-left ${
                  mobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 top-[60px] bg-[#F6F2EA]/98 backdrop-blur-xl z-50 flex flex-col justify-between px-6 py-8 md:hidden border-t border-[#E7DDCE] shadow-2xl pointer-events-auto animate-fade-in"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-xl font-bold text-[#1B2E24] hover:text-[#B18A5A] transition-colors border-b border-[#E7DDCE]/60 pb-2.5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-sm text-[#B18A5A]">&rarr;</span>
              </a>
            ))}
            <div className="pt-2 space-y-2.5">
              <a
                href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                  `Hello! I want to check availability and book at ${hotelConfig.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center space-x-2 w-full py-3 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] bg-[#25D366] hover:bg-[#1fb855] transition-colors rounded-full shadow-md"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Book on WhatsApp</span>
              </a>
              <a
                href="#inquire"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full py-3 text-xs uppercase tracking-[0.16em] font-bold text-[#FFFCF7] bg-[#31483A] hover:bg-[#22352A] transition-colors rounded-full shadow-sm"
              >
                Reservation Inquiry
              </a>
            </div>
          </nav>
          <div className="pt-4 border-t border-[#E7DDCE] text-[11px] text-[#6D7168]">
            <p className="font-semibold text-[#1B2E24]">{hotelConfig.name}</p>
            <p>{hotelConfig.location.displayAddress}</p>
          </div>
        </div>
      )}
    </header>
  );
}
