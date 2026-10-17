"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useHotel } from "@/context/HotelContext";

export function Header() {
  const hotelConfig = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { label: "Villas", href: "#stay" },
    { label: "Amenities", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-[1280px] mx-auto pointer-events-auto rounded-full transition-all duration-500 px-5 sm:px-8 py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-[#FFFCF7]/95 backdrop-blur-md shadow-xl border-[#D8C7B2]"
            : "bg-[#FFFCF7]/90 backdrop-blur-sm shadow-md border-[#E7DDCE]"
        }`}
      >
        {/* Brand Wordmark (Bold Serif & Region) */}
        <Link
          href="#"
          className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31483A] rounded-sm"
          aria-label={hotelConfig.name}
        >
          <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-wider text-[#1B2E24] font-bold group-hover:text-[#B18A5A] transition-colors leading-tight">
            {hotelConfig.shortBrandLabel || hotelConfig.name}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#6D7168] font-semibold -mt-0.5">
            {hotelConfig.location.region}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-7 lg:space-x-10 text-xs uppercase tracking-[0.2em] font-semibold text-[#1B2E24]"
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
        <div className="flex items-center space-x-2 sm:space-x-3">

          <a
            href="#inquire"
            className="shimmer-btn inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-bold text-[#FFFCF7] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Book Villa
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
            <div className="w-5 h-4 flex flex-col justify-between">
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
          className="fixed inset-0 top-20 bg-[#F6F2EA] z-50 flex flex-col justify-between px-6 py-10 md:hidden border-t border-[#E7DDCE] shadow-2xl pointer-events-auto animate-fade-in"
        >
          <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-bold text-[#1B2E24] hover:text-[#B18A5A] transition-colors border-b border-[#E7DDCE]/60 pb-3"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inquire"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center w-full py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#FFFCF7] bg-[#31483A] hover:bg-[#22352A] transition-colors rounded-full shadow-md"
            >
              Enquire About Your Stay
            </a>
          </nav>

          <div className="text-xs text-[#6D7168] space-y-2 pt-6 border-t border-[#E7DDCE]">
            <p className="font-serif text-base text-[#1B2E24] font-bold">{hotelConfig.name}</p>
            <p className="font-medium">{hotelConfig.location.displayAddress}</p>
            {hotelConfig.contact.phone && <p>{hotelConfig.contact.phone}</p>}
          </div>
        </div>
      )}
    </header>
  );
}
