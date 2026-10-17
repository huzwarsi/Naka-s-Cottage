"use client";

import React, { createContext, useContext } from 'react';
import { hotelConfig, HotelConfig } from '@/config/hotel.config';

interface HotelContextType {
  hotel: HotelConfig;
}

const HotelContext = createContext<HotelContextType>({
  hotel: hotelConfig,
});

export function HotelProvider({
  children,
  initialHotel,
}: {
  children: React.ReactNode;
  initialHotel?: HotelConfig;
}) {
  const currentHotel = initialHotel || hotelConfig;

  return (
    <HotelContext.Provider value={{ hotel: currentHotel }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  return context.hotel;
}
