import { hotelConfig, kazbegiRidgeConfig, HotelConfig } from '@/config/hotel.config';

export interface DBHotel {
  id: string;
  name: string;
  short_brand_label?: string;
  tagline?: string;
  location: any;
  hero: any;
  story: any;
  rooms: any[];
  amenities: any[];
  gallery: any[];
  contact: any;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

function configToDBHotel(cfg: HotelConfig, id: string, isActive = false): DBHotel {
  return {
    id,
    name: cfg.name,
    short_brand_label: cfg.shortBrandLabel,
    tagline: cfg.tagline,
    location: cfg.location,
    hero: cfg.hero,
    story: cfg.story,
    rooms: cfg.rooms,
    amenities: cfg.amenities,
    gallery: cfg.gallery,
    contact: cfg.contact,
    is_active: isActive,
  };
}

// Static in-memory store
const staticList: DBHotel[] = [
  configToDBHotel(hotelConfig, 'nakas-cottage', true),
  configToDBHotel(kazbegiRidgeConfig, 'kazbegi-ridge', false),
];

export async function getHotels(): Promise<DBHotel[]> {
  return staticList;
}

export async function getActiveHotel(id?: string): Promise<DBHotel | null> {
  if (id) {
    const found = staticList.find(h => h.id.toLowerCase() === id.toLowerCase());
    if (found) return found;
  }
  return staticList.find(h => h.is_active) || staticList[0] || null;
}

export async function updateHotel(id: string, data: Partial<DBHotel>): Promise<DBHotel | null> {
  const index = staticList.findIndex(h => h.id === id);
  if (index !== -1) {
    staticList[index] = { ...staticList[index], ...data };
    return staticList[index];
  }
  return null;
}

export async function setActiveHotel(id: string): Promise<boolean> {
  staticList.forEach(h => {
    h.is_active = h.id === id;
  });
  return true;
}

export async function createHotel(data: DBHotel): Promise<DBHotel> {
  staticList.push(data);
  return data;
}

export async function deleteHotel(id: string): Promise<boolean> {
  const idx = staticList.findIndex(h => h.id === id);
  if (idx !== -1) {
    staticList.splice(idx, 1);
    return true;
  }
  return false;
}

const pool = {
  query: async () => ({ rows: [] }),
};
export default pool;
