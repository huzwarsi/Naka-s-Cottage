const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin123@localhost:5432/postgres',
});

const defaultHotel = {
  id: 'kazbegi-ridge',
  name: 'Kazbegi Ridge Resort & Villas',
  shortBrandLabel: 'Kazbegi Ridge',
  tagline: 'Luxury Private Villas with Heated Pools & Mountain Views',
  location: {
    country: 'Georgia',
    region: 'Kazbegi / Stepantsminda',
    areaDescription: 'Located in Stepantsminda, Georgia at 2,100 meters elevation with panoramic views of Mount Kazbek.',
    displayAddress: 'Stepantsminda, Kazbegi Region, Georgia',
    mapUrl: 'https://maps.google.com/?q=Stepantsminda,+Georgia',
    gettingHere: 'We provide private luxury 4x4 airport pickup from Tbilisi International Airport (TBS) directly to your villa doorstep (2.5 hours scenic drive).',
  },
  hero: {
    eyebrow: 'Stepantsminda, Georgia • 2,100m Elevation',
    headline: 'Wake Up Above The Clouds',
    description: 'Private architectural villas with heated swimming pools, floor-to-ceiling glass, and 360° Caucasus mountain views.',
    image: '/images/hero-1.jpg',
    imageAlt: 'Modern architectural luxury villa with private swimming pool',
    primaryCtaText: 'Book via WhatsApp',
    secondaryCtaText: 'Explore Villas',
    slides: [
      { url: '/images/hero-1.jpg', alt: 'Modern architectural luxury villa with private swimming pool and glass walls', title: 'Private Pool Villa' },
      { url: '/images/hero-2.jpg', alt: 'Contemporary resort villa with sun deck and palms', title: 'Sunlit Architectural Deck' },
      { url: '/images/hero-3.jpg', alt: 'White minimalist luxury villa overlooking turquoise water', title: 'Panoramic Glass Pavilion' },
      { url: '/images/hero-4.jpg', alt: 'Modern architectural estate with private pool and loungers', title: 'Evening Horizon Estate' },
    ],
  },
  story: {
    eyebrow: 'About The Resort',
    heading: 'Modern Architecture Meets Natural Mountain Luxury',
    paragraphs: [
      'Kazbegi Ridge Resort offers twelve private luxury villas designed with modern glass, natural stone, and wood architecture.',
      'Each villa features a private heated swimming pool, spacious sun terrace, high-speed WiFi, and 24/7 dedicated concierge service.',
      'Enjoy complimentary chef-prepared breakfast every morning and private 4x4 airport chauffeur service from Tbilisi.',
    ],
    image: '/images/hero-2.jpg',
    imageAlt: 'Modern architectural villa exterior and sun terrace',
    quote: 'Complete privacy, stunning mountain views, and 5-star personalized service.',
    quoteAuthor: 'Kazbegi Ridge Resort',
  },
  rooms: [
    {
      id: 'panoramic-pool-villa',
      name: 'Panoramic Pool Villa',
      description: 'Private luxury villa featuring a private heated swimming pool, outdoor sun deck, master king bedroom, floor-to-ceiling glass walls, and mountain views.',
      image: '/images/hero-1.jpg',
      imageAlt: 'Modern luxury villa with private swimming pool and glass walls',
      occupancy: 'Up to 2 guests',
      size: '65 m² / 700 sq ft',
      rate: '$240',
      rateIsIllustrative: true,
      features: [
        'Private heated swimming pool',
        'Master king bed with luxury linens',
        'Spacious sun terrace & loungers',
        'Complimentary gourmet breakfast',
      ],
      galleryImages: [
        { url: '/images/hero-1.jpg', caption: 'Private Heated Swimming Pool & Villa' },
        { url: '/images/room-1.jpg', caption: 'Master Bedroom & Glass Walls' },
        { url: '/images/room-bath.jpg', caption: 'Freestanding Stone Soaking Tub' },
        { url: '/images/room-balcony.jpg', caption: 'Private Sun Deck at Sunrise' },
      ],
    },
    {
      id: 'valley-deluxe-villa',
      name: 'Valley Deluxe Villa',
      description: 'Modern architectural villa featuring a sun deck, luxury bathroom with rainfall shower, private garden terrace, and scenic pine valley views.',
      image: '/images/hero-3.jpg',
      imageAlt: 'Modern white architectural villa with pool',
      occupancy: 'Up to 2 guests',
      size: '45 m² / 485 sq ft',
      rate: '$180',
      rateIsIllustrative: true,
      features: [
        'King bed with organic cotton sheets',
        'Modern rainfall shower & heated stone floor',
        'Private garden sun patio',
        'High-speed WiFi & 55" smart TV',
      ],
      galleryImages: [
        { url: '/images/hero-3.jpg', caption: 'Modern Minimalist Villa Exterior' },
        { url: '/images/room-2.jpg', caption: 'Deluxe Bedroom & Morning Light' },
        { url: '/images/gallery-2.jpg', caption: 'Architectural Stone & Glass' },
        { url: '/images/gallery-3.jpg', caption: 'Outdoor Private Breakfast' },
      ],
    },
    {
      id: 'presidential-estate-villa',
      name: 'Presidential Estate Villa',
      description: 'Two-story luxury villa with a private plunge pool, master mezzanine suite, living lounge with working wood fireplace, and mountain panoramas.',
      image: '/images/hero-4.jpg',
      imageAlt: 'Contemporary luxury villa estate with pool',
      occupancy: 'Up to 4 guests',
      size: '85 m² / 915 sq ft',
      rate: '$320',
      rateIsIllustrative: true,
      features: [
        'Two-story luxury villa layout',
        'Private pool & panoramic sun loungers',
        'Cozy working wood fireplace',
        'Dedicated 24/7 private concierge',
      ],
      galleryImages: [
        { url: '/images/hero-4.jpg', caption: 'Private Estate Pool & Sun Deck' },
        { url: '/images/room-3.jpg', caption: 'Upper-Level Master Loft Suite' },
        { url: '/images/room-fireplace.jpg', caption: 'Living Room with Open Fireplace' },
        { url: '/images/gallery-5.jpg', caption: 'Panoramic Mountain Horizon' },
      ],
    },
  ],
  amenities: [
    {
      id: 'pools',
      title: 'Private Heated Pools & Spa',
      description: 'Enjoy private temperature-controlled swimming pools in every villa, plus access to our cedar sauna and herbal bathhouse.',
      image: '/images/hero-1.jpg',
      imageAlt: 'Private villa swimming pool with sun deck',
      tag: 'Pools & Spa',
    },
    {
      id: 'dining',
      title: 'Private Chef & Gourmet Breakfast',
      description: 'Complimentary breakfast served to your villa terrace every morning, plus private BBQ dinners and regional wine selections.',
      image: '/images/exp-dining.jpg',
      imageAlt: 'Fine dining table set with fresh dishes and wine',
      tag: 'Dining',
    },
    {
      id: 'tours',
      title: 'VIP 4x4 Chauffeur & Mountain Tours',
      description: 'Free airport transfers from Tbilisi in private 4x4 vehicles, plus guided excursions to ancient watchtowers and glaciers.',
      image: '/images/exp-trails.jpg',
      imageAlt: 'Scenic mountain trail and private guided hiking',
      tag: 'Tours & Transfers',
    },
  ],
  gallery: [
    { id: 'pool-villa', image: '/images/hero-1.jpg', alt: 'Private luxury villa with turquoise swimming pool', caption: 'Private Heated Pool & Modern Villa', aspect: 'landscape' },
    { id: 'villa-deck', image: '/images/hero-2.jpg', alt: 'Sunlit architectural villa deck and pool', caption: 'Sunlit Architectural Deck', aspect: 'portrait' },
    { id: 'breakfast-terrace', image: '/images/gallery-3.jpg', alt: 'Fresh breakfast served on private terrace', caption: 'Complimentary Villa Breakfast', aspect: 'landscape' },
    { id: 'fireside-lounge', image: '/images/gallery-4.jpg', alt: 'Modern villa lounge with warm fireplace', caption: 'Cozy Fireside Living Room', aspect: 'square' },
    { id: 'mountain-view', image: '/images/hero-4.jpg', alt: 'Panoramic villa pool with mountain backdrop', caption: 'Villa Estate with Mountain Views', aspect: 'landscape' },
    { id: 'bathroom-suite', image: '/images/room-bath.jpg', alt: 'Luxury stone soaking tub overlooking nature', caption: 'Freestanding Stone Soaking Tub', aspect: 'square' },
  ],
  contact: {
    whatsappNumber: '03132220567',
    phone: '+92 313 2220567',
    email: 'stay@kazbegiridge-demo.ge',
    hours: 'Guest desk daily: 08:00 – 22:00 GET',
  },
  isActive: true,
};

async function setup() {
  try {
    console.log('Connecting to PostgreSQL...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id VARCHAR(100) PRIMARY KEY,
        name TEXT NOT NULL,
        short_brand_label TEXT,
        tagline TEXT,
        location JSONB NOT NULL,
        hero JSONB NOT NULL,
        story JSONB NOT NULL,
        rooms JSONB NOT NULL,
        amenities JSONB NOT NULL,
        gallery JSONB NOT NULL,
        contact JSONB NOT NULL,
        is_active BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('Table "hotels" checked/created.');

    // Check if kazbegi-ridge exists
    const check = await pool.query('SELECT id FROM hotels WHERE id = $1', [defaultHotel.id]);
    if (check.rows.length === 0) {
      await pool.query(`
        INSERT INTO hotels (
          id, name, short_brand_label, tagline, location, hero, story, rooms, amenities, gallery, contact, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        defaultHotel.id,
        defaultHotel.name,
        defaultHotel.shortBrandLabel,
        defaultHotel.tagline,
        JSON.stringify(defaultHotel.location),
        JSON.stringify(defaultHotel.hero),
        JSON.stringify(defaultHotel.story),
        JSON.stringify(defaultHotel.rooms),
        JSON.stringify(defaultHotel.amenities),
        JSON.stringify(defaultHotel.gallery),
        JSON.stringify(defaultHotel.contact),
        true,
      ]);
      console.log('Default hotel "kazbegi-ridge" seeded successfully.');
    } else {
      console.log('Default hotel already exists in database.');
    }

    // Ensure at least one hotel is marked as active
    await pool.query(`
      UPDATE hotels SET is_active = true WHERE id = $1 AND NOT EXISTS (SELECT 1 FROM hotels WHERE is_active = true)
    `, [defaultHotel.id]);

    console.log('Database setup complete!');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error setting up database:', err);
    await pool.end();
    process.exit(1);
  }
}

setup();
