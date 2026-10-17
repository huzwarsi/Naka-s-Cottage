/**
 * ============================================================================
 * HOTEL CONFIGURATION — CENTRAL SOURCE OF TRUTH
 * ============================================================================
 * Property: Naka’s Cottage / ნაკას კოტეჯი (Tbilisi, Georgia)
 * Rating: 4.0 ★ (29 reviews — Google Maps listing)
 * ============================================================================
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional occupancy label (e.g. "Up to 2 guests") */
  occupancy?: string;
  /** Optional room dimensions (e.g. "58 m² / 624 sq ft") */
  size?: string;
  /** Optional illustrative rate string (e.g. "From $240 / night") */
  rate?: string;
  /** Whether the displayed rate is illustrative demo data */
  rateIsIllustrative?: boolean;
  /** Key highlights or features */
  features?: string[];
  /** Multiple photos for interactive room gallery showcase */
  galleryImages?: { url: string; caption: string }[];
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  caption?: string;
  aspect?: "landscape" | "portrait" | "square" | "panoramic";
}

export interface HotelConfig {
  /** Hotel full brand name */
  name: string;
  /** Short brand label / wordmark used in compact headers */
  shortBrandLabel?: string;
  /** Tagline or subtitle */
  tagline?: string;

  /** Geographic and location information */
  location: {
    country: string;
    region: string;
    areaDescription: string;
    displayAddress: string;
    mapUrl: string;
    gettingHere?: string;
  };

  /** Above-the-fold hero section content */
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    image: string;
    imageAlt: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    slides?: { url: string; alt: string; title: string }[];
  };

  /** Editorial story and property background */
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    quote?: string;
    quoteAuthor?: string;
  };

  /** Rooms and suites catalog */
  rooms: Room[];

  /** Property amenities and guest experiences */
  amenities: Amenity[];

  /** Curated photography showcase */
  gallery: GalleryItem[];

  /** Reservation inquiry handling */
  inquiry: {
    destinationType: "mailto" | "whatsapp" | "endpoint" | "demo";
    contactEmail: string;
    whatsappNumber?: string;
    endpointUrl?: string;
    disclaimer: string;
  };

  /** Direct contact channels */
  contact: {
    phone: string;
    whatsappNumber?: string;
    email: string;
    hours: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
    };
  };

  /** Demo configuration */
  demoMode: boolean;
  demoNotice: string;
}

export const hotelConfig: HotelConfig = {
  name: "Naka’s Cottage",
  shortBrandLabel: "Naka’s Cottage / ნაკას კოტეჯი",
  tagline: "Private Architectural A-Frame Chalet with Swimming Pool & Lake Views",

  location: {
    country: "Georgia",
    region: "Tbilisi",
    areaDescription: "Perched along the peaceful shores with sweeping panoramas of the Tbilisi lake and mountains, Naka's Cottage offers an idyllic private haven featuring a private outdoor swimming pool, lakeside balconies, and lush pine garden.",
    displayAddress: "65A, Unknown Heroes Street, Tbilisi 0178, Georgia",
    mapUrl: "https://maps.google.com/?q=65A+Unknown+Heroes+Street+Tbilisi+0178+Georgia",
    gettingHere: "Conveniently located in Tbilisi, Georgia with easy private car and taxi access. Features a secure private gated courtyard with smart keypad self check-in.",
  },

  hero: {
    eyebrow: "TBILISI, GEORGIA • 4.0 ★ (29 GOOGLE REVIEWS)",
    headline: "Panoramic Lake Views & Cozy Chalet Luxury",
    description: "Private architectural A-frame cottage featuring an outdoor swimming pool, lakeside balconies with hanging egg chair, timber loft master suite, full kitchen, and authentic Georgian barbecue.",
    image: "/images/client/chalet-night-illumination.png",
    imageAlt: "Naka's Cottage A-Frame chalet illuminated at night with warm perimeter lighting",
    primaryCtaText: "Book via WhatsApp",
    secondaryCtaText: "Explore Cottage & Rooms",
    slides: [
      {
        url: "/images/client/chalet-night-illumination.png",
        alt: "Naka's Cottage illuminated A-frame chalet at twilight with warm roof contour lights",
        title: "Night Illumination & Warm Ambiance",
      },
      {
        url: "/images/client/chalet-golden-hour-front.png",
        alt: "Naka's Cottage golden hour front facade with private balconies and entrance",
        title: "Architectural A-Frame Golden Hour",
      },
      {
        url: "/images/client/chalet-lakeview-deck.png",
        alt: "Panoramic wooden balcony deck overlooking turquoise lake and rolling hills",
        title: "Panoramic Lake & Mountain Deck",
      },
      {
        url: "/images/client/chalet-outdoor-pool.png",
        alt: "Private outdoor swimming pool with sun loungers and green privacy hedges",
        title: "Private Outdoor Pool & Sun Terrace",
      },
      {
        url: "/images/client/chalet-balcony-egg-chair.png",
        alt: "Hanging rattan egg chair on wooden balcony facing panoramic lake vista",
        title: "Lakeside Egg Chair Balcony",
      },
      {
        url: "/images/client/chalet-lake-sunset.png",
        alt: "Golden sunset reflecting over the peaceful lake waters",
        title: "Golden Hour Lake Reflection",
      },
    ],
  },

  story: {
    eyebrow: "About Naka's Cottage",
    heading: "A Natural Wooden Sanctuary Overlooking Tbilisi Lake",
    paragraphs: [
      "Nestled on Unknown Heroes Street in Tbilisi, Naka's Cottage is a distinctive architectural two-story A-frame chalet designed for travelers, couples, and families seeking an intimate, peaceful escape.",
      "Wake up to fresh lake breezes on the private balcony, relax in the hanging egg chair with Georgian coffee, spend sun-soaked afternoons by your private swimming pool, and grill traditional Georgian shashlik on the balcony mangal as the sun sets over the water.",
      "Inside, warm natural timber panels, designer rope lighting, a cozy master loft bed, a modern kitchen with dishwasher, and an illuminated luxury bathroom provide all the comforts of a high-end boutique retreat."
    ],
    image: "/images/client/chalet-golden-hour-front.png",
    imageAlt: "Naka's Cottage A-Frame architecture at sunset",
    quote: "A peaceful private wooden chalet with stunning lake panoramas, private pool, and genuine Georgian hospitality.",
    quoteAuthor: "Naka’s Cottage / ნაკას კოტეჯი",
  },

  rooms: [
    {
      id: "entire-a-frame-chalet",
      name: "Entire Private A-Frame Cottage",
      description: "Exclusive private reservation of the entire two-story wooden chalet. Includes the upper master loft bedroom, ground-floor living & dining room with smart TV, full kitchen with dishwasher, designer bathroom, outdoor swimming pool, and lakeside balconies.",
      image: "/images/client/chalet-golden-hour-front.png",
      imageAlt: "Entire Naka's Cottage A-Frame exterior and private grounds",
      occupancy: "Up to 6 guests",
      size: "120 m² / 1,290 sq ft",
      rate: "₾350 / night",
      rateIsIllustrative: false,
      features: [
        "Private outdoor swimming pool & sun loungers",
        "Lakeside wooden balconies with hanging egg chair",
        "Fully equipped modern kitchen with dishwasher",
        "Balcony barbecue station (Georgian mangal & skewers)",
        "Designer bathroom with illuminated LED mirror",
        "Smart keypad lock with seamless self check-in"
      ],
      galleryImages: [
        { url: "/images/client/chalet-night-illumination.png", caption: "Illuminated A-Frame Architecture at Night" },
        { url: "/images/client/chalet-golden-hour-front.png", caption: "Golden Hour Front View & Triangular Balcony" },
        { url: "/images/client/chalet-lakeview-deck.png", caption: "Balcony Deck with Panoramic Lake Views" },
        { url: "/images/client/chalet-master-bedroom-cozy.png", caption: "Upper Loft Master Bedroom with Ambient Lighting" },
        { url: "/images/client/chalet-interior-dining.jpg", caption: "Spacious Living Room & Handcrafted Dining Table" },
        { url: "/images/client/chalet-kitchen-modern.png", caption: "Modern Kitchen with Dishwasher & Induction Cooktop" },
        { url: "/images/client/chalet-outdoor-pool.png", caption: "Private Swimming Pool & Sunbathing Patio" },
        { url: "/images/client/chalet-bathroom-luxury.png", caption: "Cedar Bathroom with Illuminated LED Mirror" },
      ],
    },
    {
      id: "panoramic-loft-suite",
      name: "Panoramic Lakeview Loft Suite",
      description: "Cozy upper-level master loft bedroom nestled beneath the triangular timber roof. Features a plush double bed with traditional Georgian kilim carpet, romantic ambient lighting, and glass doors opening to a high balcony with sweeping lake views.",
      image: "/images/client/chalet-master-bedroom-cozy.png",
      imageAlt: "Cozy wooden loft bedroom with ambient mood lighting",
      occupancy: "2 guests",
      size: "45 m² / 485 sq ft",
      rate: "₾220 / night",
      rateIsIllustrative: false,
      features: [
        "Floor-to-ceiling triangular glass facade",
        "High wooden balcony with panoramic lake views",
        "Plush double bed with ambient LED lighting",
        "Traditional Georgian woven kilim decor",
        "High-speed Wi-Fi & climate control"
      ],
      galleryImages: [
        { url: "/images/client/chalet-master-bedroom-cozy.png", caption: "Warm Timber Loft Bed & Ambient Lights" },
        { url: "/images/client/chalet-loft-bedroom-view.png", caption: "Balcony Terrace Overlooking the Loft Bedroom" },
        { url: "/images/client/chalet-balcony-coffee.png", caption: "Morning Coffee on the Lakeview Balcony" },
        { url: "/images/client/chalet-lake-sunset.png", caption: "Golden Sunset over Tbilisi Lake" },
      ],
    },
    {
      id: "ground-pool-living-suite",
      name: "Lakeside Deck & Garden Suite",
      description: "Ground-level spacious living suite featuring comfortable lounge sofas, handcrafted dining table, smart TV with media console, and direct walk-out to the private outdoor swimming pool patio and barbecue area.",
      image: "/images/client/chalet-interior-dining.jpg",
      imageAlt: "Spacious ground-floor living and dining room with wooden paneling",
      occupancy: "Up to 4 guests",
      size: "75 m² / 805 sq ft",
      rate: "₾280 / night",
      rateIsIllustrative: false,
      features: [
        "Direct walk-out access to swimming pool patio",
        "Handcrafted dining table & comfortable lounge seating",
        "Smart TV lounge with floating media console",
        "Balcony barbecue station (mangal) with lake vistas",
        "Full kitchen access with dishwasher"
      ],
      galleryImages: [
        { url: "/images/client/chalet-interior-dining.jpg", caption: "Living Room Lounge & Dining Area" },
        { url: "/images/client/chalet-interior-tv-lounge.png", caption: "Smart TV Media Console & Rope Lighting" },
        { url: "/images/client/chalet-kitchen-modern.png", caption: "Fully Equipped Kitchen & Appliances" },
        { url: "/images/client/chalet-outdoor-pool.png", caption: "Swimming Pool Patio with Sun Loungers" },
        { url: "/images/client/chalet-bbq-grill.png", caption: "Outdoor Balcony Barbecue Mangal" },
        { url: "/images/client/chalet-georgian-wine.jpg", caption: "Georgian Saperavi Wine & Crystal Glasses" },
      ],
    },
  ],

  amenities: [
    {
      id: "pool",
      title: "Private Swimming Pool & Sun Deck",
      description: "Enjoy your own private swimming pool equipped with comfortable white sunloungers, side tables, and lush green privacy hedges with views over the lake.",
      image: "/images/client/chalet-outdoor-pool.png",
      imageAlt: "Private outdoor swimming pool with sunloungers and green hedges",
      tag: "Pool & Sun Deck",
    },
    {
      id: "bbq",
      title: "Lakeside Barbecue & Georgian Mangal",
      description: "Cook fresh shashlik skewers on the private balcony barbecue station (mangal) with open views of the lake and mountain breeze.",
      image: "/images/client/chalet-bbq-grill.png",
      imageAlt: "Balcony barbecue grill with skewers and lake view",
      tag: "BBQ & Dining",
    },
    {
      id: "kitchen",
      title: "Modern Gourmet Kitchen with Dishwasher",
      description: "Complete self-catering setup with modern cabinetry, built-in dishwasher, sleek stone basin, induction cooktop, dinnerware, and refrigerator.",
      image: "/images/client/chalet-kitchen-modern.png",
      imageAlt: "Modern wooden chalet kitchen with dishwasher and hanging lights",
      tag: "Full Kitchen",
    },
    {
      id: "views",
      title: "Panoramic Lake Balcony & Egg Chair",
      description: "Relax on the wooden terrace in the hanging egg chair or Acapulco chairs, soaking in 180-degree panoramic views of the water and golden sunsets.",
      image: "/images/client/chalet-balcony-egg-chair.png",
      imageAlt: "Hanging egg chair on private balcony overlooking lake",
      tag: "Scenic Views",
    },
    {
      id: "bathroom",
      title: "Luxury Cedar Bathroom & Rain Shower",
      description: "Modern cedar-paneled bathroom featuring an illuminated LED vanity mirror, floating cabinetry, and instant hot water rain shower system.",
      image: "/images/client/chalet-bathroom-luxury.png",
      imageAlt: "Modern bathroom with glowing LED mirror and designer vanity",
      tag: "Luxury Bath",
    },
    {
      id: "security",
      title: "Gated Estate & Smart Self Check-in",
      description: "Completely private, fenced property with digital keypad gate lock for effortless 24/7 self check-in and secure on-premises parking.",
      image: "/images/client/chalet-keypad-gate.png",
      imageAlt: "Smart keypad lock and gated entrance to Naka's Cottage",
      tag: "Privacy & Security",
    },
  ],

  gallery: [
    {
      id: "g1",
      image: "/images/client/chalet-night-illumination.png",
      alt: "Naka's Cottage illuminated A-frame chalet at night",
      caption: "Night Illumination & Warm LED Contour",
      aspect: "landscape",
    },
    {
      id: "g2",
      image: "/images/client/chalet-golden-hour-front.png",
      alt: "Golden hour sunset architecture of Naka's Cottage",
      caption: "A-Frame Cottage at Sunset",
      aspect: "portrait",
    },
    {
      id: "g3",
      image: "/images/client/chalet-lakeview-deck.png",
      alt: "Panoramic lake and hill view from sunlit balcony deck",
      caption: "Turquoise Lake & Mountain Panorama",
      aspect: "landscape",
    },
    {
      id: "g4",
      image: "/images/client/chalet-balcony-egg-chair.png",
      alt: "Cozy hanging rattan egg chair on wooden balcony",
      caption: "Balcony Hanging Egg Chair",
      aspect: "portrait",
    },
    {
      id: "g5",
      image: "/images/client/chalet-outdoor-pool.png",
      alt: "Private swimming pool with sunloungers and hedge",
      caption: "Private Outdoor Pool & Sun Terrace",
      aspect: "landscape",
    },
    {
      id: "g6",
      image: "/images/client/chalet-master-bedroom-cozy.png",
      alt: "Cozy wooden loft master bedroom with ambient lighting",
      caption: "Timber Loft Master Bedroom",
      aspect: "square",
    },
    {
      id: "g7",
      image: "/images/client/chalet-interior-dining.jpg",
      alt: "Living room with handcrafted dining table and sofa",
      caption: "Spacious Living Room & Dining Area",
      aspect: "landscape",
    },
    {
      id: "g8",
      image: "/images/client/chalet-interior-tv-lounge.png",
      alt: "Smart TV lounge with wooden floating console",
      caption: "Smart TV Lounge & Rope Lighting",
      aspect: "square",
    },
    {
      id: "g9",
      image: "/images/client/chalet-kitchen-modern.png",
      alt: "Modern kitchen with dishwasher and sleek stone sink",
      caption: "Full Modern Kitchen with Dishwasher",
      aspect: "portrait",
    },
    {
      id: "g10",
      image: "/images/client/chalet-bathroom-luxury.png",
      alt: "Cedar bathroom with glowing LED mirror",
      caption: "Designer Cedar Bathroom with LED Mirror",
      aspect: "portrait",
    },
    {
      id: "g11",
      image: "/images/client/chalet-bbq-grill.png",
      alt: "Balcony barbecue station with Georgian mangal skewers",
      caption: "Balcony Barbecue Mangal Station",
      aspect: "square",
    },
    {
      id: "g12",
      image: "/images/client/chalet-georgian-wine.jpg",
      alt: "Traditional Georgian Saperavi wine and crystal glasses",
      caption: "Georgian Saperavi Wine Tasting",
      aspect: "portrait",
    },
  ],

  inquiry: {
    destinationType: "whatsapp",
    contactEmail: "nakascottage@gmail.com",
    whatsappNumber: "995597123880",
    endpointUrl: "",
    disclaimer: "Send an inquiry or chat with us on WhatsApp to check live availability and reserve your cottage stay. Our guest concierge confirms bookings within 15 minutes.",
  },

  contact: {
    phone: "+995 597 12 38 80",
    whatsappNumber: "995597123880",
    email: "nakascottage@gmail.com",
    hours: "Guest desk daily: 08:00 – 23:00 GET",
    socialLinks: {
      instagram: "https://instagram.com",
    },
  },

  demoMode: false,
  demoNotice: "",
};

export const kazbegiRidgeConfig: HotelConfig = {
  name: "Kazbegi Ridge Resort & Villas",
  shortBrandLabel: "Kazbegi Ridge",
  tagline: "Luxury Private Villas with Heated Pools & Mountain Views",
  location: {
    country: "Georgia",
    region: "Kazbegi / Stepantsminda",
    areaDescription: "Located in Stepantsminda, Georgia at 2,100 meters elevation with panoramic views of Mount Kazbek.",
    displayAddress: "Stepantsminda, Kazbegi Region, Georgia",
    mapUrl: "https://maps.google.com/?q=Stepantsminda,+Georgia",
    gettingHere: "We provide private luxury 4x4 airport pickup from Tbilisi International Airport (TBS) directly to your villa doorstep (2.5 hours scenic drive).",
  },
  hero: {
    eyebrow: "Stepantsminda, Georgia • 2,100m Elevation",
    headline: "Wake Up Above The Clouds",
    description: "Private architectural villas with heated swimming pools, floor-to-ceiling glass, and 360° Caucasus mountain views.",
    image: "/images/hero-1.jpg",
    imageAlt: "Modern architectural luxury villa with private swimming pool",
    primaryCtaText: "Book via WhatsApp",
    secondaryCtaText: "Explore Villas",
    slides: [
      { url: "/images/hero-1.jpg", alt: "Modern architectural luxury villa with private swimming pool and glass walls", title: "Private Pool Villa" },
      { url: "/images/hero-2.jpg", alt: "Contemporary resort villa with sun deck and palms", title: "Sunlit Architectural Deck" },
      { url: "/images/hero-3.jpg", alt: "White minimalist luxury villa overlooking turquoise water", title: "Panoramic Glass Pavilion" },
      { url: "/images/hero-4.jpg", alt: "Modern architectural estate with private pool and loungers", title: "Evening Horizon Estate" },
    ],
  },
  story: {
    eyebrow: "About The Resort",
    heading: "Modern Architecture Meets Natural Mountain Luxury",
    paragraphs: [
      "Kazbegi Ridge Resort offers twelve private luxury villas designed with modern glass, natural stone, and wood architecture.",
      "Each villa features a private heated swimming pool, spacious sun terrace, high-speed WiFi, and 24/7 dedicated concierge service.",
      "Enjoy complimentary chef-prepared breakfast every morning and private 4x4 airport chauffeur service from Tbilisi.",
    ],
    image: "/images/hero-2.jpg",
    imageAlt: "Modern architectural villa exterior and sun terrace",
    quote: "Complete privacy, stunning mountain views, and 5-star personalized service.",
    quoteAuthor: "Kazbegi Ridge Resort",
  },
  rooms: [
    {
      id: "panoramic-pool-villa",
      name: "Panoramic Pool Villa",
      description: "Private luxury villa featuring a private heated swimming pool, outdoor sun deck, master king bedroom, floor-to-ceiling glass walls, and mountain views.",
      image: "/images/hero-1.jpg",
      imageAlt: "Modern luxury villa with private swimming pool and glass walls",
      occupancy: "Up to 2 guests",
      size: "65 m² / 700 sq ft",
      rate: "$240",
      rateIsIllustrative: true,
      features: [
        "Private heated swimming pool",
        "Master king bed with luxury linens",
        "Spacious sun terrace & loungers",
        "Complimentary gourmet breakfast",
      ],
      galleryImages: [
        { url: "/images/hero-1.jpg", caption: "Private Heated Swimming Pool & Villa" },
        { url: "/images/room-1.jpg", caption: "Master Bedroom & Glass Walls" },
        { url: "/images/room-bath.jpg", caption: "Freestanding Stone Soaking Tub" },
        { url: "/images/room-balcony.jpg", caption: "Private Sun Deck at Sunrise" },
      ],
    },
    {
      id: "valley-deluxe-villa",
      name: "Valley Deluxe Villa",
      description: "Modern architectural villa featuring a sun deck, luxury bathroom with rainfall shower, private garden terrace, and scenic pine valley views.",
      image: "/images/hero-3.jpg",
      imageAlt: "Modern white architectural villa with pool",
      occupancy: "Up to 2 guests",
      size: "45 m² / 485 sq ft",
      rate: "$180",
      rateIsIllustrative: true,
      features: [
        "King bed with organic cotton sheets",
        "Modern rainfall shower & heated stone floor",
        "Private garden sun patio",
        "High-speed WiFi & 55\" smart TV",
      ],
      galleryImages: [
        { url: "/images/hero-3.jpg", caption: "Modern Minimalist Villa Exterior" },
        { url: "/images/room-2.jpg", caption: "Deluxe Bedroom & Morning Light" },
        { url: "/images/gallery-2.jpg", caption: "Architectural Stone & Glass" },
        { url: "/images/gallery-3.jpg", caption: "Outdoor Private Breakfast" },
      ],
    },
    {
      id: "presidential-estate-villa",
      name: "Presidential Estate Villa",
      description: "Two-story luxury villa with a private plunge pool, master mezzanine suite, living lounge with working wood fireplace, and mountain panoramas.",
      image: "/images/hero-4.jpg",
      imageAlt: "Contemporary luxury villa estate with pool",
      occupancy: "Up to 4 guests",
      size: "85 m² / 915 sq ft",
      rate: "$320",
      rateIsIllustrative: true,
      features: [
        "Two-story luxury villa layout",
        "Private pool & panoramic sun loungers",
        "Cozy working wood fireplace",
        "Dedicated 24/7 private concierge",
      ],
      galleryImages: [
        { url: "/images/hero-4.jpg", caption: "Private Estate Pool & Sun Deck" },
        { url: "/images/room-3.jpg", caption: "Upper-Level Master Loft Suite" },
        { url: "/images/room-fireplace.jpg", caption: "Living Room with Open Fireplace" },
        { url: "/images/gallery-5.jpg", caption: "Panoramic Mountain Horizon" },
      ],
    },
  ],
  amenities: [
    {
      id: "pools",
      title: "Private Heated Pools & Spa",
      description: "Enjoy private temperature-controlled swimming pools in every villa, plus access to our cedar sauna and herbal bathhouse.",
      image: "/images/hero-1.jpg",
      imageAlt: "Private villa swimming pool with sun deck",
      tag: "Pools & Spa",
    },
    {
      id: "dining",
      title: "Private Chef & Gourmet Breakfast",
      description: "Complimentary breakfast served to your villa terrace every morning, plus private BBQ dinners and regional wine selections.",
      image: "/images/exp-dining.jpg",
      imageAlt: "Fine dining table set with fresh dishes and wine",
      tag: "Dining",
    },
    {
      id: "tours",
      title: "VIP 4x4 Chauffeur & Mountain Tours",
      description: "Free airport transfers from Tbilisi in private 4x4 vehicles, plus guided excursions to ancient watchtowers and glaciers.",
      image: "/images/exp-trails.jpg",
      imageAlt: "Scenic mountain trail and private guided hiking",
      tag: "Tours & Transfers",
    },
  ],
  gallery: [
    { id: "pool-villa", image: "/images/hero-1.jpg", alt: "Private luxury villa with turquoise swimming pool", caption: "Private Heated Pool & Modern Villa", aspect: "landscape" },
    { id: "villa-deck", image: "/images/hero-2.jpg", alt: "Sunlit architectural villa deck and pool", caption: "Sunlit Architectural Deck", aspect: "portrait" },
    { id: "breakfast-terrace", image: "/images/gallery-3.jpg", alt: "Fresh breakfast served on private terrace", caption: "Complimentary Villa Breakfast", aspect: "landscape" },
    { id: "fireside-lounge", image: "/images/gallery-4.jpg", alt: "Modern villa lounge with warm fireplace", caption: "Cozy Fireside Living Room", aspect: "square" },
    { id: "mountain-view", image: "/images/hero-4.jpg", alt: "Panoramic villa pool with mountain backdrop", caption: "Villa Estate with Mountain Views", aspect: "landscape" },
    { id: "bathroom-suite", image: "/images/room-bath.jpg", alt: "Luxury stone soaking tub overlooking nature", caption: "Freestanding Stone Soaking Tub", aspect: "square" },
  ],
  inquiry: {
    destinationType: "whatsapp",
    contactEmail: "stay@kazbegiridge-demo.ge",
    whatsappNumber: "03132220567",
    endpointUrl: "",
    disclaimer: "Send an inquiry or chat with us on WhatsApp to check live availability and reserve your villa stay.",
  },
  contact: {
    phone: "+92 313 2220567",
    whatsappNumber: "03132220567",
    email: "stay@kazbegiridge-demo.ge",
    hours: "Guest desk daily: 08:00 – 22:00 GET",
  },
  demoMode: true,
  demoNotice: "Demonstration preview for luxury property hospitality pitch.",
};

export const staticHotels: Record<string, HotelConfig> = {
  "nakas-cottage": hotelConfig,
  "naka": hotelConfig,
  "kazbegi-ridge": kazbegiRidgeConfig,
  "kazbegi": kazbegiRidgeConfig,
};

