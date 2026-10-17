import { hotelConfig, staticHotels } from "@/config/hotel.config";
import { HotelProvider } from "@/context/HotelContext";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Rooms } from "@/components/Rooms";
import { Amenities } from "@/components/Amenities";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { InquiryForm } from "@/components/InquiryForm";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { FloatingConcierge } from "@/components/FloatingConcierge";

export const instant = false;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const { client } = await searchParams;
  const hotel = (client && staticHotels[client.toLowerCase()]) || hotelConfig;


  return (
    <HotelProvider initialHotel={hotel}>
      <div className="flex min-h-screen flex-col bg-[#F6F2EA] text-[#252A24] selection:bg-[#31483A] selection:text-[#FFFCF7]">
        {/* Accessible Fixed Header */}
        <Header />

        {/* Main Long-Form Page Sections */}
        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Property Story Section */}
          <Story />

          {/* Rooms & Suites Section with interactive cards & rates */}
          <Rooms />

          {/* Experience & Life at the Lodge with interactive cards */}
          <Amenities />

          {/* Photography & Atmosphere Gallery with Lightbox */}
          <Gallery />

          {/* Authentic Google Guest Reviews with Smooth Infinite Animation */}
          <Reviews />

          {/* Reservation / Booking Inquiry Flow with Live Stay Estimate */}
          <InquiryForm />

          {/* Location & Getting Here */}
          <Location />
        </main>

        {/* Floating Concierge Action */}
        <FloatingConcierge />

        {/* Footer */}
        <Footer />
      </div>
    </HotelProvider>
  );
}
