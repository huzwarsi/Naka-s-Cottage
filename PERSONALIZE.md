# Personalization Guide — Boutique Mountain Hotel Sales Demo

This website is designed as a reusable, high-conversion sales presentation that you can rapidly customize for boutique hotel owners in **Georgia, the USA, Saudi Arabia, Turkey, Switzerland, and worldwide**.

All hotel-specific content, branding, photography paths, room types, amenities, and contact destinations live in a **single configuration file**:
👉 [`src/config/hotel.config.ts`](file:///d:/Pitch%20Website/src/config/hotel.config.ts)

Follow the 6 steps below to personalize this demo for a new prospective hotel client.

---

## 1. Change Hotel Name, Brand Label & Location

Open `src/config/hotel.config.ts` and update the top-level identity fields:

```typescript
export const hotelConfig: HotelConfig = {
  name: "Al-Ula Canyon Retreat", // Prospect hotel's real name
  shortBrandLabel: "Al-Ula Retreat", // Wordmark used in compact headers
  tagline: "A silent desert sanctuary among sandstone canyons",

  location: {
    country: "Saudi Arabia",
    region: "Al-Ula / Ashar Valley",
    areaDescription: "Nestled between monolithic ochre canyons in the Ashar Valley.",
    displayAddress: "Ashar Valley, Al-Ula, Saudi Arabia",
    mapUrl: "https://maps.google.com/?q=Al-Ula",
    gettingHere: "A 35-minute private chauffeur transfer from AlUla International Airport (ULH).",
  },
  // ...
```

---

## 2. Replace Hero, Room & Gallery Images

All photography is referenced by relative path in `src/config/hotel.config.ts`.
For maximum performance and offline reliability, save the client's optimized photos into `public/images/`:

| Config Field | Default Path | Recommended Dimensions | Content Description |
| :--- | :--- | :--- | :--- |
| `hero.image` | `/images/hero.jpg` | 1920×1080 or 1600×1100 | Breathtaking landscape or exterior architecture at golden hour |
| `story.image` | `/images/story.jpg` | 1200×1500 | Authentic stone, timber, or interior design detail |
| `rooms[].image` | `/images/room-1.jpg`, etc. | 1200×825 | Warm bedroom view showing natural light, linens, and scenery |
| `amenities[].image` | `/images/exp-dining.jpg`, etc. | 1200×900 | Dining, wellness / bathhouse, or outdoor excursion |
| `gallery[].image` | `/images/gallery-1.jpg`, etc. | 1200×800 | Varied atmospheric moments (terraces, details, fire, breakfast) |

> [!TIP]
> If using remote image URLs (e.g. from the client's existing CDN or Unsplash), ensure the hostname is added to `remotePatterns` in [`next.config.ts`](file:///d:/Pitch%20Website/next.config.ts).

---

## 3. Configure Phone, Email, WhatsApp & Map Link

Update the `contact` and `location.mapUrl` fields in `src/config/hotel.config.ts`:

```typescript
  contact: {
    phone: "+966 14 000 0000",
    email: "concierge@hotel-domain.com",
    hours: "Concierge daily: 07:00 – 23:00 AST",
    socialLinks: {
      instagram: "https://instagram.com/prospect_hotel",
    },
  },
```

> [!NOTE]
> If the prospect does not have active social links, simply set `socialLinks: undefined` or omit specific platforms. The UI will cleanly hide them without leaving empty spaces.

---

## 4. Update Rooms, Features & Amenities

Update the `rooms` and `amenities` arrays in `src/config/hotel.config.ts`:

```typescript
  rooms: [
    {
      id: "canyon-pool-villa",
      name: "Canyon Pool Villa",
      description: "Private sandstone sanctuary with a plunge pool overlooking the dunes.",
      image: "/images/room-1.jpg",
      imageAlt: "Private villa with desert plunge pool",
      occupancy: "Up to 2 guests",
      size: "95 m² / 1,020 sq ft",
      rate: "From $650 / night",
      rateIsIllustrative: true, // Set to false if client confirmed published rates
      features: [
        "Private heated plunge pool",
        "Outdoor stargazing daybed",
        "Handmade ceramic bath amenities",
      ],
    },
    // Add 1 or 2 more rooms (2–3 rooms total recommended for marketing focus)
  ],
```

---

## 5. Test the Inquiry Destination Before Pitching

The demo supports 4 honest inquiry dispatch modes via `inquiry.destinationType`:

1. **`"mailto"` (Recommended default for zero-backend demos)**:
   - When the user submits, a transparent modal confirms their details and opens their default email client with a pre-filled message addressed to `inquiry.contactEmail`.
   - Never falsely claims the message was already delivered.
2. **`"whatsapp"`**:
   - Opens a pre-filled WhatsApp conversation with the number specified in `inquiry.whatsappNumber` (format without `+`: e.g. `"966500000000"`).
3. **`"endpoint"`**:
   - Sends a `POST` request with JSON payload to `inquiry.endpointUrl` (for webhooks, Zapier, or PMS integrations).
4. **`"demo"`**:
   - Displays an interactive modal demonstrating successful client-side validation without transmitting any data.

---

## 6. Disable Demo Notice (When Moving to Production)

In `src/config/hotel.config.ts`:

```typescript
  demoMode: false, // Turn off once client verifies all details, rates, and imagery
```

When `demoMode: false`:
- The top header demo bar is removed.
- The footer demo disclaimer banner is removed.
- Illustrative rate badges remain controlled per room via `rateIsIllustrative`.

---

## Testing & Verifying Your Personalized Build

Always run the following commands before presenting or deploying:

```bash
# 1. Check for any TypeScript or ESLint errors
npm run lint

# 2. Build the optimized production bundle
npm run build

# 3. Start local production preview
npm run start
```
