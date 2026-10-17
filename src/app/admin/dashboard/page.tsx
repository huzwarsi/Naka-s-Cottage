"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SlideItem {
  url: string;
  alt: string;
  title: string;
}

interface RoomItem {
  id: string;
  name: string;
  description: string;
  rate: string;
  occupancy?: string;
  size?: string;
  image: string;
  imageAlt: string;
  features?: string[];
}

interface HotelData {
  id: string;
  name: string;
  short_brand_label: string;
  tagline: string;
  location: {
    country: string;
    region: string;
    areaDescription: string;
    displayAddress: string;
    mapUrl: string;
    gettingHere: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    image: string;
    imageAlt: string;
    slides?: SlideItem[];
  };
  contact: {
    whatsappNumber: string;
    phone: string;
    email: string;
    hours: string;
  };
  rooms: RoomItem[];
  is_active: boolean;
}

const PRESETS = [
  {
    label: "🇬🇪 Georgia - Kazbegi Ridge Resort",
    id: "kazbegi-ridge",
    name: "Kazbegi Ridge Resort & Villas",
    short_brand_label: "Kazbegi Ridge",
    country: "Georgia",
    region: "Kazbegi / Stepantsminda",
    address: "Stepantsminda, Kazbegi Region, Georgia",
    headline: "Wake Up Above The Clouds",
    eyebrow: "Stepantsminda, Georgia • 2,100m Elevation",
    rate: "$240",
  },
  {
    label: "🇹🇷 Turkey - Bodrum Cliffside Villas",
    id: "bodrum-cliffs",
    name: "Bodrum Azure Cliffside Villas",
    short_brand_label: "Bodrum Azure",
    country: "Turkey",
    region: "Bodrum Peninsula, Aegean Coast",
    address: "Yalikavak, Bodrum, Mugla, Turkey",
    headline: "Aegean Elegance & Private Pools",
    eyebrow: "Bodrum Peninsula, Turkey • Turquoise Coast",
    rate: "$350",
  },
  {
    label: "🇸🇦 Saudi Arabia - Al-Ula Desert Oasis",
    id: "alula-oasis",
    name: "Al-Ula Canyon Private Villas",
    short_brand_label: "Al-Ula Canyon",
    country: "Saudi Arabia",
    region: "Al-Ula, Madinah Province",
    address: "Ashar Valley, Al-Ula, Saudi Arabia",
    headline: "Architectural Wonders In The Dunes",
    eyebrow: "Al-Ula, Saudi Arabia • Desert Heritage Sanctuary",
    rate: "$650",
  },
  {
    label: "🇺🇸 USA - Aspen Summit Alpine Chalet",
    id: "aspen-summit",
    name: "Aspen Summit Luxury Chalets",
    short_brand_label: "Aspen Summit",
    country: "United States",
    region: "Aspen / Snowmass, Colorado",
    address: "Red Mountain Road, Aspen, CO, USA",
    headline: "Private Heated Pools & Alpine Peaks",
    eyebrow: "Aspen, Colorado • 2,400m Mountain Retreat",
    rate: "$890",
  },
];

export default function AdminPage() {
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [formData, setFormData] = useState<HotelData | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "whatsapp" | "villas">("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch hotels list on mount
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hotels");
      const data = await res.json();
      if (data.success && data.hotels.length > 0) {
        setHotels(data.hotels);
        const active = data.hotels.find((h: HotelData) => h.is_active) || data.hotels[0];
        setSelectedId(active.id);
        setFormData(active);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Error loading hotels from PostgreSQL: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHotel = (id: string) => {
    setSelectedId(id);
    const found = hotels.find((h) => h.id === id);
    if (found) {
      setFormData(JSON.parse(JSON.stringify(found)));
    }
  };

  const handleActivate = async () => {
    if (!selectedId) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/hotels/${selectedId}/activate`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `"${formData?.name}" is now the active live website!` });
        await fetchHotels();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to activate hotel" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData || !selectedId) return;

    try {
      setSaving(true);
      setMessage(null);

      const res = await fetch(`/api/hotels/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "All changes saved successfully in PostgreSQL!" });
        // Refresh local list
        setHotels((prev) => prev.map((h) => (h.id === selectedId ? data.hotel : h)));
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save changes" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNew = async () => {
    const newId = prompt("Enter a unique identifier slug (e.g. 'bodrum-villas'):");
    if (!newId) return;

    const baseName = prompt("Enter Hotel Name (e.g. 'Bodrum Azure Resort'):") || "New Boutique Hotel";

    const newHotel: HotelData = {
      id: newId.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      name: baseName,
      short_brand_label: baseName.split(" ")[0] || "Boutique",
      tagline: "Luxury Private Pool Villas",
      location: {
        country: "Turkey",
        region: "Bodrum Peninsula",
        areaDescription: "Perched on the cliffside overlooking the azure waters.",
        displayAddress: "Bodrum, Turkey",
        mapUrl: "https://maps.google.com",
        gettingHere: "Private chauffeur transfer from Milas-Bodrum Airport (BJV).",
      },
      hero: {
        eyebrow: "Luxury Private Villas • Heated Pools",
        headline: "Wake Up Above The Clouds",
        description: "Private architectural villas with heated swimming pools and mountain views.",
        image: "/images/hero-1.jpg",
        imageAlt: "Modern luxury villa",
        slides: [
          { url: "/images/hero-1.jpg", alt: "Private Pool Villa", title: "Private Pool Villa" },
          { url: "/images/hero-2.jpg", alt: "Architectural Deck", title: "Architectural Deck" },
          { url: "/images/hero-3.jpg", alt: "Panoramic Glass Pavilion", title: "Glass Pavilion" },
          { url: "/images/hero-4.jpg", alt: "Evening Estate", title: "Evening Estate" },
        ],
      },
      contact: {
        whatsappNumber: "03132220567",
        phone: "+92 313 2220567",
        email: "stay@demo-hotel.com",
        hours: "Guest desk daily: 08:00 – 22:00",
      },
      rooms: [
        {
          id: "deluxe-pool-villa",
          name: "Panoramic Pool Villa",
          description: "Private luxury villa featuring a private heated swimming pool and sun deck.",
          rate: "$250",
          occupancy: "Up to 2 guests",
          size: "65 m²",
          image: "/images/hero-1.jpg",
          imageAlt: "Luxury pool villa",
          features: ["Private heated pool", "King bed", "Sun deck", "Daily breakfast"],
        },
      ],
      is_active: false,
    };

    try {
      setSaving(true);
      const res = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Client pitch "${newHotel.name}" created successfully!` });
        await fetchHotels();
        setSelectedId(newHotel.id);
        setFormData(newHotel);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create new hotel" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    if (!formData) return;
    setFormData({
      ...formData,
      name: preset.name,
      short_brand_label: preset.short_brand_label,
      location: {
        ...formData.location,
        country: preset.country,
        region: preset.region,
        displayAddress: preset.address,
      },
      hero: {
        ...formData.hero,
        headline: preset.headline,
        eyebrow: preset.eyebrow,
      },
    });
    setMessage({ type: "success", text: `Applied preset for ${preset.label}. Remember to click 'Save All Changes'!` });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111A15] text-[#FFFCF7] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#B18A5A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg">Connecting to PostgreSQL Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1510] text-[#E0E7E2] flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#16221A] border-b border-[#25352A] px-6 py-4 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
            <h1 className="font-serif text-xl sm:text-2xl text-[#FFFCF7] font-bold">
              Pitch Admin Panel <span className="text-xs font-mono font-normal text-[#B18A5A] ml-2 px-2 py-0.5 rounded bg-[#B18A5A]/10 border border-[#B18A5A]/30">PostgreSQL Live</span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-md bg-[#25352A] hover:bg-[#324738] text-xs font-bold uppercase tracking-wider text-[#FFFCF7] transition-all flex items-center space-x-1.5"
            >
              <span>View Live Website</span>
              <span>&rarr;</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-md bg-[#25D366] hover:bg-[#1fb855] text-xs font-bold uppercase tracking-wider text-[#0D1510] transition-all shadow-md disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-6">

        {/* Status Notification Message */}
        {message && (
          <div
            className={`p-4 rounded-md text-sm border flex items-center justify-between animate-fade-in ${
              message.type === "success"
                ? "bg-[#183321] text-[#74E39A] border-[#2E6B43]"
                : "bg-[#331818] text-[#E37474] border-[#6B2E2E]"
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-xs underline ml-4 opacity-70 hover:opacity-100">
              Dismiss
            </button>
          </div>
        )}

        {/* Client Pitch Switcher Bar */}
        <div className="bg-[#16221A] p-5 rounded-lg border border-[#25352A] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <span className="text-xs uppercase tracking-wider text-[#8FA597] font-semibold whitespace-nowrap">
              Active Client Pitch:
            </span>
            <select
              value={selectedId}
              onChange={(e) => handleSelectHotel(e.target.value)}
              className="bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#25D366] font-medium min-w-[280px]"
            >
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} {h.is_active ? "★ (Active Live Site)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handleActivate}
              disabled={saving || formData?.is_active}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-all ${
                formData?.is_active
                  ? "bg-[#25352A] text-[#8FA597] cursor-default border border-[#31483A]"
                  : "bg-[#B18A5A] hover:bg-[#c49a65] text-[#0D1510]"
              }`}
            >
              {formData?.is_active ? "Current Active Live Site" : "Set As Active Live Site"}
            </button>

            <button
              type="button"
              onClick={handleCreateNew}
              className="px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md bg-[#25352A] hover:bg-[#324738] text-[#FFFCF7] border border-[#31483A] transition-all"
            >
              + Add New Client Pitch
            </button>
          </div>
        </div>

        {/* Quick Presets Drawer */}
        <div className="bg-[#121B15] p-4 rounded-lg border border-[#202E24]">
          <span className="text-xs uppercase tracking-wider text-[#B18A5A] font-bold block mb-2">
            1-Click Client Location Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 rounded bg-[#1A261E] hover:bg-[#25352A] text-xs font-medium text-[#C8D6CD] border border-[#2D3E32] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {formData && (
          <div className="bg-[#16221A] rounded-lg border border-[#25352A] overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex border-b border-[#25352A] overflow-x-auto bg-[#111A14]">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#25352A] ${
                  activeTab === "general"
                    ? "bg-[#16221A] text-[#25D366] border-b-2 border-b-[#25D366]"
                    : "text-[#8FA597] hover:text-[#FFFCF7]"
                }`}
              >
                1. Hotel Info &amp; Location
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hero")}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#25352A] ${
                  activeTab === "hero"
                    ? "bg-[#16221A] text-[#25D366] border-b-2 border-b-[#25D366]"
                    : "text-[#8FA597] hover:text-[#FFFCF7]"
                }`}
              >
                2. Hero &amp; Slideshow
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("whatsapp")}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#25352A] ${
                  activeTab === "whatsapp"
                    ? "bg-[#16221A] text-[#25D366] border-b-2 border-b-[#25D366]"
                    : "text-[#8FA597] hover:text-[#FFFCF7]"
                }`}
              >
                3. WhatsApp &amp; Contacts
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("villas")}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#25352A] ${
                  activeTab === "villas"
                    ? "bg-[#16221A] text-[#25D366] border-b-2 border-b-[#25D366]"
                    : "text-[#8FA597] hover:text-[#FFFCF7]"
                }`}
              >
                4. Villas &amp; Pricing
              </button>
            </div>

            {/* Tab Form Content */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* TAB 1: GENERAL INFO & LOCATION */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Hotel Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Short Brand Label (Navbar)
                      </label>
                      <input
                        type="text"
                        value={formData.short_brand_label || ""}
                        onChange={(e) => setFormData({ ...formData, short_brand_label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Brand Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.tagline || ""}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#25352A]">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.location.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, country: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Region / City / Area
                      </label>
                      <input
                        type="text"
                        value={formData.location.region}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, region: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Display Address
                    </label>
                    <input
                      type="text"
                      value={formData.location.displayAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, displayAddress: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Arrival &amp; Airport Transfer Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.location.gettingHere || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, gettingHere: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & SLIDESHOW */}
              {activeTab === "hero" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Hero Eyebrow (Small top text)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.eyebrow}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, eyebrow: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Hero Big Headline
                    </label>
                    <input
                      type="text"
                      value={formData.hero.headline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, headline: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.hero.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  {/* Slideshow Images */}
                  <div className="pt-4 border-t border-[#25352A]">
                    <span className="text-xs uppercase tracking-wider text-[#B18A5A] font-bold block mb-4">
                      Hero 3-Second Crossfade Slideshow (4 Photos):
                    </span>
                    <div className="space-y-3">
                      {(formData.hero.slides || [
                        { url: "/images/hero-1.jpg", alt: "Modern luxury pool villa", title: "Slide 1" },
                        { url: "/images/hero-2.jpg", alt: "Architectural deck", title: "Slide 2" },
                        { url: "/images/hero-3.jpg", alt: "Glass pavilion", title: "Slide 3" },
                        { url: "/images/hero-4.jpg", alt: "Evening estate", title: "Slide 4" },
                      ]).map((slide, sIdx) => (
                        <div key={sIdx} className="p-3 bg-[#0D1510] rounded border border-[#25352A] flex flex-col sm:flex-row items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#8FA597]">#{sIdx + 1}</span>
                          <input
                            type="text"
                            value={slide.url}
                            placeholder="Image URL or /images/..."
                            onChange={(e) => {
                              const newSlides = [...(formData.hero.slides || [])];
                              if (!newSlides[sIdx]) newSlides[sIdx] = { ...slide };
                              newSlides[sIdx].url = e.target.value;
                              setFormData({
                                ...formData,
                                hero: { ...formData.hero, slides: newSlides },
                              });
                            }}
                            className="flex-1 px-3 py-1.5 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={slide.title}
                            placeholder="Caption / Title"
                            onChange={(e) => {
                              const newSlides = [...(formData.hero.slides || [])];
                              if (!newSlides[sIdx]) newSlides[sIdx] = { ...slide };
                              newSlides[sIdx].title = e.target.value;
                              setFormData({
                                ...formData,
                                hero: { ...formData.hero, slides: newSlides },
                              });
                            }}
                            className="w-48 px-3 py-1.5 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WHATSAPP & CONTACTS */}
              {activeTab === "whatsapp" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-4 rounded bg-[#162B1D] border border-[#25D366]/40 flex items-center space-x-3">
                    <span className="text-xl">💬</span>
                    <p className="text-xs text-[#C8E8D2] leading-relaxed">
                      Entering the WhatsApp number here will <strong>automatically update every WhatsApp button</strong> on the website, including the Hero button, Floating Concierge, Villa reservation cards, and Footer!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      WhatsApp Booking Number (e.g. 03132220567 or 923132220567)
                    </label>
                    <input
                      type="text"
                      value={formData.contact.whatsappNumber || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, whatsappNumber: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#25D366] text-[#FFFCF7] text-sm focus:outline-none focus:ring-1 focus:ring-[#25D366] font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#25352A]">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Phone Call Desk
                      </label>
                      <input
                        type="text"
                        value={formData.contact.phone || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, phone: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                        Reservations Email
                      </label>
                      <input
                        type="email"
                        value={formData.contact.email || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, email: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8FA597] font-semibold mb-2">
                      Desk Hours
                    </label>
                    <input
                      type="text"
                      value={formData.contact.hours || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, hours: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#0D1510] border border-[#31483A] text-[#FFFCF7] text-sm focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: VILLAS & PRICING */}
              {activeTab === "villas" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-6">
                    {formData.rooms.map((room, rIdx) => (
                      <div key={room.id} className="p-5 bg-[#0D1510] rounded-lg border border-[#25352A] space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider font-bold text-[#B18A5A]">
                            Villa 0{rIdx + 1}
                          </span>
                          <span className="text-xs text-[#8FA597] font-mono">{room.id}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-[#8FA597] mb-1">Villa Name</label>
                            <input
                              type="text"
                              value={room.name}
                              onChange={(e) => {
                                const newRooms = [...formData.rooms];
                                newRooms[rIdx].name = e.target.value;
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-[#8FA597] mb-1">Starting Rate / Night</label>
                            <input
                              type="text"
                              value={room.rate}
                              placeholder="e.g. $240 / night"
                              onChange={(e) => {
                                const newRooms = [...formData.rooms];
                                newRooms[rIdx].rate = e.target.value;
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-sm font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-[#8FA597] mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={room.description}
                            onChange={(e) => {
                              const newRooms = [...formData.rooms];
                              newRooms[rIdx].description = e.target.value;
                              setFormData({ ...formData, rooms: newRooms });
                            }}
                            className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-[#8FA597] mb-1">Occupancy</label>
                            <input
                              type="text"
                              value={room.occupancy || ""}
                              placeholder="e.g. Up to 2 guests"
                              onChange={(e) => {
                                const newRooms = [...formData.rooms];
                                newRooms[rIdx].occupancy = e.target.value;
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-[#8FA597] mb-1">Size</label>
                            <input
                              type="text"
                              value={room.size || ""}
                              placeholder="e.g. 65 m²"
                              onChange={(e) => {
                                const newRooms = [...formData.rooms];
                                newRooms[rIdx].size = e.target.value;
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-[#8FA597] mb-1">Main Image URL</label>
                            <input
                              type="text"
                              value={room.image}
                              onChange={(e) => {
                                const newRooms = [...formData.rooms];
                                newRooms[rIdx].image = e.target.value;
                                setFormData({ ...formData, rooms: newRooms });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#16221A] border border-[#31483A] text-[#FFFCF7] text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Save Bar */}
            <div className="bg-[#111A14] px-6 py-4 border-t border-[#25352A] flex items-center justify-between">
              <span className="text-xs text-[#8FA597]">
                Changes will be saved directly into local PostgreSQL table <strong>hotels</strong>.
              </span>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-2.5 rounded-md bg-[#25D366] hover:bg-[#1fb855] text-xs font-bold uppercase tracking-wider text-[#0D1510] transition-all shadow-md disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save All Changes"}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
