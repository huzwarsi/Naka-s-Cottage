Design System — Georgia Boutique Mountain Hotel
1. Product goal
Create a polished, believable hospitality website for a fictional boutique mountain hotel in Georgia. It is a reusable sales demo for pitching hotel owners internationally. The website should feel custom-designed for a real property, not like an AI-generated template or generic SaaS landing page.
The site is a single-page marketing website with a booking inquiry flow. It does not claim real-time room availability or confirm reservations.
2. Brand direction
- Mood: quiet luxury, warm hospitality, nature, calm confidence, considered details.
- Visual references: boutique lodges, mountain retreats, independent design hotels, premium travel editorials.
- Avoid: neon gradients, glassmorphism, excessive rounded cards, glowing buttons, floating blobs, huge animated text, fake counters, generic AI copy, excessive motion, emoji icons, and repeated identical cards.
- Design principle: strong photography + restrained typography + generous whitespace + clear practical information.
Palette
Use CSS variables / Tailwind theme tokens so the palette can be changed centrally.
- --color-paper: #F6F2EA — main warm ivory background
- --color-surface: #FFFCF7 — cards and light panels
- --color-ink: #252A24 — primary text
- --color-muted: #6D7168 — secondary text
- --color-forest: #31483A — primary buttons / selected details
- --color-forest-deep: #22352A — hover / footer
- --color-sand: #E7DDCE — borders and subtle surfaces
- --color-accent: #B18A5A — tiny details only, never dominant
Keep contrast accessible. Do not use the accent color for long text.
3. Typography
- Display headings: an editorial serif such as Cormorant Garamond or DM Serif Display.
- Body/UI: DM Sans or a similarly legible sans-serif.
- Use only 1 display family + 1 sans family.
- Use fluid sizes (clamp) for the hero heading; avoid oversized text that wraps awkwardly on mobile.
- Headings should feel editorial, with short natural lines.
- Body copy should be concise, warm, and specific—not over-written.
If using remote fonts, ensure graceful system fallbacks. Avoid adding a large font framework.
4. Layout system
- Mobile-first, responsive from 320px wide.
- Content max width approximately 1200–1320px.
- Desktop horizontal gutters: 48–72px; tablet: 28–36px; mobile: 18–22px.
- Section spacing should feel generous but not wasteful.
- Use a consistent 8px spacing rhythm.
- Prefer square or subtly rounded corners (2–8px). Do not make every element pill-shaped.
- Hairline borders and quiet dividers are encouraged.
- Header can be transparent over the hero initially, then use a solid paper background if a simple scroll state is needed. Do not add complex scroll animation.
5. Single-page structure
A. Header
- Small typographic wordmark from hotel.name (or a short configured brand label).
- Navigation anchors: Stay, Experience, Gallery, Location.
- Primary CTA: “Enquire” / “Plan your stay”.
- Mobile menu must be keyboard accessible and functional.
- Keep the header light and uncluttered.
B. Hero
- Large high-quality landscape / hotel image with a considered crop.
- Use a split or layered editorial composition rather than a generic centered text-on-gradient layout.
- Eyebrow such as “A mountain hideaway in Georgia” (all location-specific text must come from config).
- One memorable headline, e.g. “A quieter kind of escape.”
- One short supporting sentence.
- Primary CTA: “Enquire about your stay”.
- Secondary CTA: “Explore the rooms”.
- Include a small location line, sourced from configuration.
- Ensure text remains legible with an overlay or a calm solid text area; do not over-darken the photo.
C. Intro / property story
- Brief, human copy about the setting, pace, architecture, or hospitality.
- Avoid unsupported factual claims such as awards, sustainability credentials, historic dates, or exact distances.
- The text must be editable in the config.
D. Rooms & suites
- 2–3 room types, driven by config.
- Each item: image, room name, concise description, occupancy/size only if supplied, optional indicative rate only if supplied.
- Do not invent rates, square footage, occupancy, room inventory, or availability.
- If sample rates are enabled for the demo, visibly label them as illustrative and keep them configurable.
- CTA should lead to the inquiry section and preselect the room when possible.
E. Experience / amenities
- A compact editorial grid or split feature, based on configured amenities.
- Only show facilities the prospect has confirmed. For the generic demo, clearly treat the sample property and its amenities as fictional/demo content.
- Avoid a giant icon-card wall. Use photography and short copy.
F. Gallery
- 4–6 images in an asymmetrical but responsive grid.
- Each image needs meaningful alt text.
- Use Next.js Image with correct sizing / aspect ratios.
- No autoplay carousel. A simple accessible lightbox is optional only if it remains lightweight and keyboard accessible.
G. Booking inquiry
- Clearly title it “Plan your stay” or “Send an enquiry.”
- Fields: name, email, arrival date, departure date, guests, optional preferred room, message.
- Client-side validation for required fields, valid email, departure after arrival, and guest count.
- Show a clear privacy note: submitting an inquiry does not confirm a booking.
- On submit, use a safe configured destination:
  1. If a server endpoint / email integration is actually configured, submit there.
  2. Otherwise, open a prefilled mailto: link or WhatsApp link with the inquiry details, if configured.
  3. If no destination is configured, show a friendly demo notice rather than falsely claiming that the request was sent.
- Do not put secret API keys in client code.
- No fake success state that implies the hotel received the inquiry when it did not.
H. Location
- Show the configured address / area and a “Open in maps” link if a maps URL is supplied.
- Do not invent a precise street address or embed a map that adds unnecessary weight.
- Optional short “Getting here” copy from config.
I. Footer
- Hotel name, configured location, contact details, anchor links, social links only when supplied.
- No invented social accounts or contact details.
- Small “Demo concept” notice should be available in demo mode and easy to turn off only after details are verified.
6. Interaction and motion
- Smooth anchor navigation with reduced-motion support.
- Hover states are subtle: color, underline, or small image-scale shift.
- Avoid scroll-jacking, cursor effects, parallax dependencies, animated counters, auto-playing video, and heavy animation libraries.
- Respect prefers-reduced-motion.
- Every interactive element must work with keyboard and touch.
- Visible focus rings; semantic headings and labels.
7. Image direction
Prefer authentic, high-quality photography:
- misty Caucasus / Georgian mountain landscapes
- timber-and-stone boutique lodge architecture
- warm neutral bedroom with natural light
- intimate breakfast / dining spaces
- terrace or mountain-view lounge
Use consistent color grading: natural greens, warm wood, soft daylight, restrained contrast. Avoid obviously synthetic imagery and mismatched stock photos.
Store image references in one config file. Add comments explaining how to replace each image. If remote image URLs are used, configure next/image remote patterns correctly. Prefer local optimized files in public/images/ for the simplest reliable deployment.
Never imply that stock/demo imagery depicts the actual prospect’s property. For prospect-specific outreach, replace the images or label the page as a concept demo.
8. Responsive behavior
- Desktop: full editorial layout, image/text split sections, wide gallery.
- Tablet: reduce gutters and columns without shrinking text excessively.
- Mobile: stacked sections, full-width CTA, comfortable form controls, no horizontal overflow, usable menu, gallery becomes one or two columns.
- Test at 320px, 375px, 768px, 1024px, and 1440px.
- Date controls and select inputs must remain usable on mobile.
9. Accessibility
- Semantic landmarks (header, nav, main, section, footer).
- One meaningful H1; logical heading order.
- Form controls have visible labels and useful validation messages.
- Alt text for meaningful images; empty alt for purely decorative images.
- Sufficient color contrast and visible keyboard focus.
- Escape key closes any optional lightbox; return focus to trigger.
- Respect reduced motion.
10. Performance
- Use Next.js App Router and Tailwind CSS.
- Use next/image for responsive image optimization.
- Keep client components limited to the mobile menu, inquiry form, and optional lightbox.
- Keep the rest as server components where practical.
- Avoid UI libraries and animation packages unless essential.
- Avoid loading all gallery images at full resolution above the fold.
- Use appropriate image dimensions, lazy loading below the fold, and no autoplay video.
- No database or CMS is required for this demo.
- Run lint/build and fix errors before declaring complete.
11. Content rules
- Use natural, restrained hospitality copy.
- No fake reviews, testimonials, awards, certifications, occupancy statistics, “best hotel” claims, or live availability.
- No fabricated exact address, phone number, or email for a real property.
- Use fictional sample data in the default demo and make it obvious in config.
- Make all visible property-specific content configurable.
12. Design acceptance checklist
- Looks like an independent boutique hotel, not a template marketplace or AI landing page.
- Photography and typography do most of the visual work.
- Consistent palette, spacing, and restrained corners.
- Room cards and gallery are visually varied but coherent.
- Mobile layout is clean and functional.
- Inquiry flow validates inputs and clearly states what happens on submit.
- All property-specific data comes from one central config.
- No fabricated facts or broken contact links.
- Fast production build, minimal dependencies, no console errors.