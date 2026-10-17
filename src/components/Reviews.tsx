"use client";

import { useState, useRef } from "react";
import { useHotel } from "@/context/HotelContext";
import { Star, ChevronLeft, ChevronRight, Play, Pause, Check, User } from "lucide-react";

interface ReviewItem {
  id: string;
  author: string;
  avatarImage?: string;
  badge?: string;
  rating: number;
  date: string;
  source: string;
  text: string;
  highlight?: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "r1",
    author: "Edgar A.",
    avatarImage: "/images/avatars/avatar-1.jpg",
    badge: "Local Guide · 11 reviews · 4 photos",
    rating: 5,
    date: "3 months ago",
    source: "Google",
    text: "Great cottage! Exactly like the photos and videos! Everything you need is there and more. There are games for fun, backgammon, dominoes. There's a great, clean pool. Everything is clean and nice. And of course, the view from the veranda is superb.",
    highlight: "Exactly like the photos and videos! Clean pool & superb view.",
  },
  {
    id: "r2",
    author: "Ani G.",
    avatarImage: "/images/avatars/avatar-2.jpg",
    badge: "Verified Guest",
    rating: 5,
    date: "4 months ago",
    source: "Google",
    text: "I really don't know how to describe in words the peace, tranquility and beauty that you can feel from the moment you step foot in it. Trust me, I'm not exaggerating, the view and the surroundings are so perfect.",
    highlight: "Peace, tranquility and beauty from the moment you step foot in it.",
  },
  {
    id: "r3",
    author: "Tako Jintcharadze",
    avatarImage: "/images/avatars/avatar-4.jpg",
    badge: "1 review · 1 photo",
    rating: 5,
    date: "5 months ago",
    source: "Google",
    text: "The best environment ❣️ The best views ☀️ Everything was clean, private and relaxing. The veranda overlooks the lake and mountain breeze.",
    highlight: "The best environment ❣️ The best views ☀️",
  },
  {
    id: "r4",
    author: "Robakidze 13",
    avatarImage: "/images/avatars/avatar-3.jpg",
    badge: "1 review",
    rating: 5,
    date: "4 months ago",
    source: "Google",
    text: "Wonderful environment, thank you for opening such a space! A truly private wooden cottage with swimming pool overlooking the hills. ❤️",
    highlight: "Wonderful environment, thank you for opening such a space ❤️",
  },
  {
    id: "r5",
    author: "Tamila (თამილა)",
    avatarImage: "/images/avatars/avatar-7.jpg",
    badge: "Vacation Stay · 1 review",
    rating: 5,
    date: "5 months ago",
    source: "Google",
    text: "Thank you for the best days ❤️❤️ Unforgettable peaceful atmosphere, outdoor pool, and golden sunsets reflecting on the water.",
    highlight: "Thank you for the best days ❤️❤️",
  },
  {
    id: "r6",
    author: "Nani Tordia",
    avatarImage: "/images/avatars/avatar-5.jpg",
    badge: "1 review",
    rating: 5,
    date: "5 months ago",
    source: "Google",
    text: "A better environment! Cozy natural timber interior, clean swimming pool, private gated territory, and genuine hospitality.",
    highlight: "A better environment with peaceful lake panoramas.",
  },
  {
    id: "r7",
    author: "Giorgi K.",
    avatarImage: "/images/avatars/avatar-6.jpg",
    badge: "Local Guide",
    rating: 5,
    date: "2 months ago",
    source: "Google",
    text: "The architectural A-frame design is stunning both day and night. We loved grilling on the balcony mangal while looking at the sunset over Tbilisi lake.",
    highlight: "Architectural A-frame design with barbecue mangal.",
  },
];

export function Reviews() {
  const hotel = useHotel();
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const googleMapsUrl = hotel.location?.mapUrl || "https://maps.google.com/?q=65A+Unknown+Heroes+Street+Tbilisi+0178+Georgia";

  // Manual scroll buttons
  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-16 sm:py-24 bg-[#F6F2EA] border-t border-[#E7DDCE] relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mb-8 sm:mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-6 sm:w-8 h-[2px] bg-[#B18A5A]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#B18A5A]">
                Google Reviews &amp; Testimonials
              </span>
            </div>
            <h2
              id="reviews-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B2E24] font-bold leading-tight"
            >
              What Our Guests Experience
            </h2>
          </div>

          {/* Google Score Badge Card & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#FFFCF7] border border-[#E7DDCE] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs border border-gray-100 shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="font-serif text-base font-bold text-[#1B2E24]">4.0</span>
                  <div className="flex items-center space-x-0.5 text-[#F59E0B]">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>
                <span className="text-[10px] text-[#6D7168] font-medium block -mt-0.5 group-hover:text-[#B18A5A] transition-colors">
                  29 Google Reviews &rarr;
                </span>
              </div>
            </a>

            {/* Slider Controls */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                className="w-9 h-9 rounded-full bg-[#FFFCF7] border border-[#E7DDCE] text-[#1B2E24] hover:bg-[#31483A] hover:text-[#FFFCF7] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Scroll reviews left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                className="w-9 h-9 rounded-full bg-[#FFFCF7] border border-[#E7DDCE] text-[#1B2E24] hover:bg-[#31483A] hover:text-[#FFFCF7] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Scroll reviews right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-colors flex items-center space-x-1.5 ${
                  isPaused
                    ? "bg-[#31483A] text-[#FFFCF7] border-[#31483A]"
                    : "bg-[#FFFCF7] text-[#6D7168] border-[#E7DDCE] hover:text-[#1B2E24]"
                }`}
                aria-label={isPaused ? "Resume auto scroll" : "Pause auto scroll"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>Pause</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          CONTINUOUS ANIMATED REVIEWS MARQUEE TRACK (Looping Carousel)
         ========================================================================= */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar py-3 px-4 sm:px-6 cursor-grab active:cursor-grabbing"
      >
        <div
          className={`animate-marquee-track flex gap-4 sm:gap-6 ${
            isPaused ? "is-paused" : ""
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double list for infinite smooth continuous loop */}
          {[...reviewsData, ...reviewsData].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[290px] xs:w-[330px] sm:w-[380px] md:w-[410px] shrink-0 bg-[#FFFCF7] rounded-2xl p-5 sm:p-6 border border-[#E7DDCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Card Header matching User Reference */}
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center space-x-3">
                    {/* User Silhouette / Profile Logo Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F2EDE4] border border-[#DDD3C4] flex items-center justify-center text-[#3D4B3F] shrink-0 shadow-xs">
                      <User className="w-5 h-5 text-[#3D4B3F]/85" />
                    </div>

                    {/* Author & Date */}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1B2E24] leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-[#6D7168] mt-0.5">
                        {item.date}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex items-center space-x-0.5 mt-1 text-[#F59E0B]">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className={`w-3.5 h-3.5 ${
                              sIdx < item.rating
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Google G Logo Badge */}
                  <div
                    title="Verified Google Review"
                    className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-xs flex items-center justify-center shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#4A5046] font-normal leading-relaxed line-clamp-4 mt-2">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="mt-4 pt-3 border-t border-[#E7DDCE]/70 flex items-center justify-between text-[10.5px]">
                <span className="text-[#31483A] font-semibold flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-[#25D366] stroke-[2.5]" />
                  <span>{item.badge || "Verified Guest"}</span>
                </span>
                <span className="text-[#B18A5A] font-medium">
                  {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-note */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mt-6 text-center">
        <p className="text-[11px] text-[#6D7168]">
          All reviews collected directly from{" "}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1B2E24] font-semibold underline hover:text-[#B18A5A] transition-colors"
          >
            Naka’s Cottage Google Maps Business Profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}
