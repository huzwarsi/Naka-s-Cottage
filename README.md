# Boutique Mountain Hotel Demo — Sales Pitch Presentation

A bespoke, production-ready single-page marketing website for boutique hotels, retreats, and luxury lodges. Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, adhering to the editorial design language defined in [`design.md`](file:///d:/Pitch%20Website/design.md).

## Highlights & Features

- **Editorial Hospitality Design System**: Warm ivory canvas (`#F6F2EA`), forest green accents (`#31483A`), tactile sand borders (`#E7DDCE`), Cormorant Garamond serif headings, and DM Sans typography.
- **Centralized Single-Config Architecture**: All hotel branding, copy, photography, room details, amenities, and inquiry routing are configured exclusively in [`src/config/hotel.config.ts`](file:///d:/Pitch%20Website/src/config/hotel.config.ts).
- **Interactive Booking Inquiry Flow**:
  - Full client-side validation (name, email, arrival, departure after arrival, guests count).
  - Room selection pre-fills the preferred suite in the inquiry form.
  - Transparent destination routing: Mailto dispatch, WhatsApp concierge, or custom API webhook.
  - Zero false promises: clearly distinguishes an inquiry from a confirmed reservation.
- **Accessible Lightbox Gallery**: Keyboard-navigable (Esc to close, Left/Right arrows to cycle), focus management, and screen-reader friendly markup.
- **Responsive & Motion Sensitive**: Tested across 320px, 375px, 768px, 1024px, and 1440px+ viewport widths, with strict `prefers-reduced-motion` compliance.
- **Zero Heavy Dependencies**: Built entirely with React 19 and Next.js native primitives; no heavy UI frameworks or unneeded libraries.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Lint Checks
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Start the Production Server
```bash
npm run start
```

---

## Personalizing for a Prospective Hotel

To personalize this website for a specific hotel prospect in Georgia, Saudi Arabia, USA, Turkey, or elsewhere:

1. Follow the step-by-step instructions in [`PERSONALIZE.md`](file:///d:/Pitch%20Website/PERSONALIZE.md).
2. Edit [`src/config/hotel.config.ts`](file:///d:/Pitch%20Website/src/config/hotel.config.ts).
3. Place custom high-resolution photos in `public/images/`.
4. Test the inquiry flow and build before presenting to the client.
