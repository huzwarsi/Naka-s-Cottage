"use client";

import { useState, useEffect } from "react";
import { useHotel } from "@/context/HotelContext";
import { formatPhoneNumber } from "@/lib/formatPhone";

export function FloatingConcierge() {
  const hotel = useHotel();
  const [visible, setVisible] = useState(false);

  const whatsappDisplay = (hotel.contact as any)?.whatsappNumber || "03132220567";
  const cleanDigits = whatsappDisplay.replace(/[^0-9]/g, "");
  const whatsappRaw = cleanDigits.startsWith("0") ? "92" + cleanDigits.slice(1) : cleanDigits;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Quick WhatsApp & Booking Concierge"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 animate-fade-in"
    >
      {/* WhatsApp Quick Chat Button */}
      <a
        href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
          `Hello! I am viewing ${hotel.name} and would like to enquire about room availability.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#25D366] text-[#FFFCF7] shadow-2xl hover:bg-[#1fb855] transition-all duration-300 transform hover:scale-105 border border-[#FFFCF7]/30"
      >
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="text-xs font-bold tracking-wide font-sans">
          WhatsApp: {formatPhoneNumber(whatsappDisplay)}
        </span>
      </a>

      {/* Plan Stay Anchor */}
      <a
        href="#inquire"
        className="group flex items-center space-x-3 px-5 py-3 rounded-full bg-[#1B2E24] text-[#FFFCF7] border border-[#31483A] shadow-2xl hover:bg-[#31483A] hover:border-[#B18A5A] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B18A5A] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B18A5A]" />
        </span>
        <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans">
          Plan Your Stay
        </span>
        <span className="text-[#B18A5A] group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">
          &rarr;
        </span>
      </a>
    </aside>
  );
}
