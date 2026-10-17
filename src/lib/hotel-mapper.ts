import { HotelConfig, hotelConfig as fallbackConfig } from '@/config/hotel.config';
import { DBHotel } from '@/lib/db';

export function mapDBToHotelConfig(db: DBHotel | null): HotelConfig {
  if (!db) return fallbackConfig;

  const rawContact = db.contact || {};
  const rawLocation = db.location || {};
  const rawHero = db.hero || {};
  const rawStory = db.story || {};

  return {
    name: db.name || fallbackConfig.name,
    shortBrandLabel: db.short_brand_label || db.name || fallbackConfig.shortBrandLabel,
    tagline: db.tagline || fallbackConfig.tagline,
    location: {
      country: rawLocation.country || fallbackConfig.location.country,
      region: rawLocation.region || fallbackConfig.location.region,
      areaDescription: rawLocation.areaDescription || fallbackConfig.location.areaDescription,
      displayAddress: rawLocation.displayAddress || fallbackConfig.location.displayAddress,
      mapUrl: rawLocation.mapUrl || fallbackConfig.location.mapUrl,
      gettingHere: rawLocation.gettingHere || fallbackConfig.location.gettingHere,
    },
    hero: {
      eyebrow: rawHero.eyebrow || fallbackConfig.hero.eyebrow,
      headline: rawHero.headline || fallbackConfig.hero.headline,
      description: rawHero.description || fallbackConfig.hero.description,
      image: rawHero.image || fallbackConfig.hero.image,
      imageAlt: rawHero.imageAlt || fallbackConfig.hero.imageAlt,
      primaryCtaText: rawHero.primaryCtaText || fallbackConfig.hero.primaryCtaText,
      secondaryCtaText: rawHero.secondaryCtaText || fallbackConfig.hero.secondaryCtaText,
      slides: rawHero.slides || undefined,
    } as any,
    story: {
      eyebrow: rawStory.eyebrow || fallbackConfig.story.eyebrow,
      heading: rawStory.heading || fallbackConfig.story.heading,
      paragraphs: Array.isArray(rawStory.paragraphs) ? rawStory.paragraphs : fallbackConfig.story.paragraphs,
      image: rawStory.image || fallbackConfig.story.image,
      imageAlt: rawStory.imageAlt || fallbackConfig.story.imageAlt,
      quote: rawStory.quote || fallbackConfig.story.quote,
      quoteAuthor: rawStory.quoteAuthor || fallbackConfig.story.quoteAuthor,
    },
    rooms: Array.isArray(db.rooms) && db.rooms.length > 0 ? db.rooms : fallbackConfig.rooms,
    amenities: Array.isArray(db.amenities) && db.amenities.length > 0 ? db.amenities : fallbackConfig.amenities,
    gallery: Array.isArray(db.gallery) && db.gallery.length > 0 ? db.gallery : fallbackConfig.gallery,
    inquiry: {
      destinationType: 'whatsapp',
      whatsappNumber: rawContact.whatsappNumber || '03132220567',
      contactEmail: rawContact.email || fallbackConfig.inquiry.contactEmail,
      disclaimer: fallbackConfig.inquiry.disclaimer,
    },
    contact: {
      whatsappNumber: rawContact.whatsappNumber || '03132220567',
      phone: rawContact.phone || '+92 313 2220567',
      email: rawContact.email || 'stay@kazbegiridge-demo.ge',
      hours: rawContact.hours || 'Guest desk daily: 08:00 – 22:00 GET',
    } as any,
    demoMode: fallbackConfig.demoMode,
    demoNotice: fallbackConfig.demoNotice,
  };
}
