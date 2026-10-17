"use client";

import { useState, useEffect, useId, useSyncExternalStore } from "react";
import { useHotel } from "@/context/HotelContext";
import { formatPhoneNumber } from "@/lib/formatPhone";

const emptySubscribe = () => () => { };

interface FormData {
  name: string;
  email: string;
  arrival: string;
  departure: string;
  guests: number;
  roomPreference: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  arrival?: string;
  departure?: string;
  guests?: string;
}

export function InquiryForm() {
  const hotel = useHotel();
  const { inquiry, rooms, name: hotelName, contact } = hotel;

  const whatsappDisplay = (contact as any)?.whatsappNumber || "03132220567";
  const cleanDigits = whatsappDisplay.replace(/[^0-9]/g, "");
  const whatsappRaw = cleanDigits.startsWith("0") ? "92" + cleanDigits.slice(1) : cleanDigits;
  const formattedPhone = formatPhoneNumber(whatsappDisplay);

  // Form IDs for accessibility
  const nameId = useId();
  const emailId = useId();
  const arrivalId = useId();
  const departureId = useId();
  const guestsId = useId();
  const messageId = useId();

  // Safely obtain today's date string on the client without cascading renders
  const todayStr = useSyncExternalStore(
    emptySubscribe,
    () => new Date().toISOString().split("T")[0],
    () => ""
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    arrival: "",
    departure: "",
    guests: 2,
    roomPreference: rooms[0]?.id || "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "ready-to-send" | "submitting" | "demo-notice";
    actionType?: "mailto" | "whatsapp" | "demo" | "endpoint";
    url?: string;
  }>({ status: "idle" });

  // Listen for room preselection from URL hash or search params
  useEffect(() => {
    const checkHashForRoom = () => {
      const hash = window.location.hash;
      if (hash.includes("room=")) {
        const roomIdParam = hash.split("room=")[1]?.split("&")[0];
        if (roomIdParam && rooms.some((r) => r.id === decodeURIComponent(roomIdParam))) {
          setFormData((prev) => ({
            ...prev,
            roomPreference: decodeURIComponent(roomIdParam),
          }));
        }
      }
    };

    checkHashForRoom();
    window.addEventListener("hashchange", checkHashForRoom);
    return () => window.removeEventListener("hashchange", checkHashForRoom);
  }, [rooms]);

  // Handle Arrival change: if Departure <= Arrival, adjust or clear Departure
  const handleArrivalChange = (newArrival: string) => {
    setFormData((prev) => {
      const updated = { ...prev, arrival: newArrival };
      if (prev.departure && prev.departure <= newArrival) {
        const arrDate = new Date(newArrival);
        if (!isNaN(arrDate.getTime())) {
          arrDate.setDate(arrDate.getDate() + 1);
          updated.departure = arrDate.toISOString().split("T")[0];
        } else {
          updated.departure = "";
        }
      }
      return updated;
    });

    if (errors.arrival || errors.departure) {
      setErrors((prev) => ({ ...prev, arrival: undefined, departure: undefined }));
    }
  };

  // Calculate estimated nights and price
  const calculateStayEstimate = () => {
    if (!formData.arrival || !formData.departure) return null;
    const d1 = new Date(formData.arrival);
    const d2 = new Date(formData.departure);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return null;

    const selectedRoom = rooms.find((r) => r.id === formData.roomPreference);
    if (!selectedRoom?.rate) return { nights: diffDays, total: null };

    // Extract numeric rate e.g. "From $240 / night" -> 240
    const match = selectedRoom.rate.match(/\$(\d+)/);
    const rateNum = match ? parseInt(match[1], 10) : null;
    const total = rateNum ? rateNum * diffDays : null;

    return { nights: diffDays, total, rateNum };
  };

  const stayEstimate = calculateStayEstimate();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.arrival) {
      newErrors.arrival = "Please select your arrival date.";
    }

    if (!formData.departure) {
      newErrors.departure = "Please select your departure date.";
    } else if (formData.arrival && formData.departure <= formData.arrival) {
      newErrors.departure = "Departure date must be after arrival date.";
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "Guest count must be at least 1.";
    } else if (formData.guests > 12) {
      newErrors.guests = "For group bookings over 12 guests, please contact us directly.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedRoomName =
      rooms.find((r) => r.id === formData.roomPreference)?.name || "No specific room selected";

    const inquiryText = [
      `Stay Enquiry for ${hotelName}`,
      `----------------------------------------`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Arrival Date: ${formData.arrival}`,
      `Departure Date: ${formData.departure}`,
      stayEstimate ? `Duration: ${stayEstimate.nights} night(s)` : "",
      `Guests: ${formData.guests}`,
      `Preferred Room: ${selectedRoomName}`,
      stayEstimate?.total ? `Estimated Total: ~$${stayEstimate.total} USD (Illustrative)` : "",
      formData.message ? `Special Requests:\n${formData.message}` : "",
      `----------------------------------------`,
      `Sent via ${hotelName} Website Enquiry Form`,
    ]
      .filter(Boolean)
      .join("\n");

    if (inquiry.destinationType === "mailto") {
      const recipient = inquiry.contactEmail || "stay@kazbegiridge-demo.ge";
      const subject = encodeURIComponent(
        `Stay Enquiry: ${formData.name} (${formData.arrival} to ${formData.departure})`
      );
      const body = encodeURIComponent(inquiryText);
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      setSubmissionState({
        status: "ready-to-send",
        actionType: "mailto",
        url: mailtoUrl,
      });
    } else if (inquiry.destinationType === "whatsapp") {
      const number = inquiry.whatsappNumber || "";
      const text = encodeURIComponent(inquiryText);
      const whatsappUrl = `https://wa.me/${number}?text=${text}`;

      setSubmissionState({
        status: "ready-to-send",
        actionType: "whatsapp",
        url: whatsappUrl,
      });
    } else if (inquiry.destinationType === "endpoint" && inquiry.endpointUrl) {
      setSubmissionState({ status: "submitting", actionType: "endpoint" });
      try {
        const res = await fetch(inquiry.endpointUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setSubmissionState({
            status: "ready-to-send",
            actionType: "endpoint",
          });
        } else {
          alert("We were unable to deliver your enquiry right now. Please email us directly.");
          setSubmissionState({ status: "idle" });
        }
      } catch {
        alert("Network error. Please email our team directly.");
        setSubmissionState({ status: "idle" });
      }
    } else {
      setSubmissionState({
        status: "demo-notice",
        actionType: "demo",
      });
    }
  };

  const handleLaunchExternalApp = () => {
    if (submissionState.url) {
      window.location.href = submissionState.url;
    }
  };

  return (
    <section
      id="inquire"
      aria-labelledby="inquiry-heading"
      className="py-20 sm:py-28 md:py-32 bg-[#FFFCF7] border-t border-[#E7DDCE] relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Context & Hospitality Notes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="w-8 h-[2px] bg-[#B18A5A]" />
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B18A5A]">
                  Direct Reservations
                </span>
              </div>
              <h2
                id="inquiry-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B2E24] font-bold leading-tight mb-5"
              >
                Reserve Your Private Villa
              </h2>
              <p className="text-sm sm:text-base text-[#6D7168] font-normal leading-relaxed mb-6">
                Select your check-in dates and preferred villa below. You can book instantly via WhatsApp on <strong className="text-[#1B2E24]">{formattedPhone}</strong> or submit your details to receive confirmed availability and pricing within 15 minutes.
              </p>

              {/* Dynamic Live Price Calculator Badge */}
              {stayEstimate && (
                <div className="p-5 rounded-sm bg-[#31483A] text-[#FFFCF7] border border-[#22352A] shadow-md mb-6 animate-fade-in">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#B18A5A] uppercase tracking-wider font-medium">Estimated Stay</span>
                    <span className="bg-[#22352A] px-2 py-0.5 rounded text-[10px]">{stayEstimate.nights} night(s)</span>
                  </div>
                  {stayEstimate.total ? (
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="font-serif text-3xl font-medium text-[#FFFCF7]">~${stayEstimate.total}</span>
                      <span className="text-xs text-[#FFFCF7]/70">USD estimated total</span>
                    </div>
                  ) : (
                    <p className="text-xs text-[#FFFCF7]/80 mt-1">Custom quote will be provided upon review</p>
                  )}
                  <p className="text-[10px] text-[#FFFCF7]/60 mt-2 italic">
                    *Illustrative estimate. Confirmed rates provided directly by concierge.
                  </p>
                </div>
              )}

              {/* Honest Reservation Policy Notice */}
              <div className="p-5 rounded-sm bg-[#F6F2EA] border border-[#E7DDCE] text-xs text-[#252A24] space-y-2 mb-8">
                <p className="font-medium text-[#31483A] flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#31483A]" aria-hidden="true" />
                  <span>Direct Guest Policy</span>
                </p>
                <p className="text-[#6D7168] leading-relaxed">
                  {inquiry.disclaimer}
                </p>
              </div>
            </div>

            {/* Direct Contact Info & WhatsApp */}
            <div className="pt-6 border-t border-[#E7DDCE] text-xs text-[#6D7168] space-y-3">
              <p className="text-[#1B2E24] font-bold uppercase tracking-wider text-[11px]">
                Instant Concierge Contact
              </p>

              {/* Direct WhatsApp Action Button */}
              <a
                href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                  `Hello! I am inquiring about room availability at ${hotelName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1fb855] text-[#FFFCF7] font-bold tracking-wide shadow-md transition-all duration-300 transform hover:scale-102"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp: {formattedPhone}</span>
              </a>

              {contact?.email && (
                <p className="pt-1">
                  Email:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#31483A] hover:underline font-semibold"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact?.phone && (
                <p>
                  Call Desk:{" "}
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-[#31483A] hover:underline font-semibold"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact?.hours && (
                <p className="text-[11px] text-[#6D7168]/80">{contact.hours}</p>
              )}
            </div>
          </div>

          {/* Inquiry Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F6F2EA] rounded-sm p-7 sm:p-10 border border-[#E7DDCE] shadow-lg">

              {/* Interactive Room Selection Pills */}
              <div className="mb-6">
                <span className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2.5">
                  Choose Preferred Suite
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {rooms.map((room) => {
                    const isSelected = formData.roomPreference === room.id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, roomPreference: room.id })}
                        className={`p-3 text-left rounded-sm border transition-all duration-200 text-xs ${isSelected
                            ? "bg-[#31483A] text-[#FFFCF7] border-[#31483A] shadow-sm"
                            : "bg-[#FFFCF7] text-[#252A24] border-[#E7DDCE] hover:border-[#B18A5A]"
                          }`}
                      >
                        <span className="font-serif font-medium block text-sm leading-tight">
                          {room.name}
                        </span>
                        {room.rate && (
                          <span className={`block text-[10px] mt-1 ${isSelected ? "text-[#FFFCF7]/80" : "text-[#6D7168]"}`}>
                            {room.rate}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor={nameId}
                      className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                    >
                      Full Name <span className="text-[#B18A5A]">*</span>
                    </label>
                    <input
                      type="text"
                      id={nameId}
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-3 text-sm bg-[#FFFCF7] border rounded-sm text-[#252A24] placeholder:text-[#6D7168]/50 focus:outline-none focus:ring-1 ${errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E7DDCE] focus:border-[#31483A] focus:ring-[#31483A]"
                        }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1.5" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={emailId}
                      className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                    >
                      Email Address <span className="text-[#B18A5A]">*</span>
                    </label>
                    <input
                      type="email"
                      id={emailId}
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="elena@example.com"
                      className={`w-full px-4 py-3 text-sm bg-[#FFFCF7] border rounded-sm text-[#252A24] placeholder:text-[#6D7168]/50 focus:outline-none focus:ring-1 ${errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E7DDCE] focus:border-[#31483A] focus:ring-[#31483A]"
                        }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1.5" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dates: Arrival & Departure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor={arrivalId}
                      className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                    >
                      Arrival Date <span className="text-[#B18A5A]">*</span>
                    </label>
                    <input
                      type="date"
                      id={arrivalId}
                      required
                      min={todayStr}
                      value={formData.arrival}
                      onChange={(e) => handleArrivalChange(e.target.value)}
                      className={`w-full px-4 py-3 text-sm bg-[#FFFCF7] border rounded-sm text-[#252A24] focus:outline-none focus:ring-1 ${errors.arrival
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E7DDCE] focus:border-[#31483A] focus:ring-[#31483A]"
                        }`}
                    />
                    {errors.arrival && (
                      <p className="text-xs text-red-600 mt-1.5" role="alert">
                        {errors.arrival}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={departureId}
                      className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                    >
                      Departure Date <span className="text-[#B18A5A]">*</span>
                    </label>
                    <input
                      type="date"
                      id={departureId}
                      required
                      min={formData.arrival || todayStr}
                      value={formData.departure}
                      onChange={(e) => {
                        setFormData({ ...formData, departure: e.target.value });
                        if (errors.departure) setErrors({ ...errors, departure: undefined });
                      }}
                      className={`w-full px-4 py-3 text-sm bg-[#FFFCF7] border rounded-sm text-[#252A24] focus:outline-none focus:ring-1 ${errors.departure
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E7DDCE] focus:border-[#31483A] focus:ring-[#31483A]"
                        }`}
                    />
                    {errors.departure && (
                      <p className="text-xs text-red-600 mt-1.5" role="alert">
                        {errors.departure}
                      </p>
                    )}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label
                    htmlFor={guestsId}
                    className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                  >
                    Number of Guests <span className="text-[#B18A5A]">*</span>
                  </label>
                  <select
                    id={guestsId}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-4 py-3 text-sm bg-[#FFFCF7] border border-[#E7DDCE] rounded-sm text-[#252A24] focus:outline-none focus:border-[#31483A] focus:ring-1 focus:ring-[#31483A]"
                  >
                    <option value={1}>1 Guest (Solo Retreat)</option>
                    <option value={2}>2 Guests (Couple / Pair)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family Suite)</option>
                    <option value={6}>6+ Guests (Private Wing Reserve)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor={messageId}
                    className="block text-xs uppercase tracking-wider font-medium text-[#252A24] mb-2"
                  >
                    Special Requests &amp; Notes (Optional)
                  </label>
                  <textarea
                    id={messageId}
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Dietary preferences, private 4x4 mountain transfer from Tbilisi, wine requests..."
                    className="w-full px-4 py-3 text-sm bg-[#FFFCF7] border border-[#E7DDCE] rounded-sm text-[#252A24] placeholder:text-[#6D7168]/50 focus:outline-none focus:border-[#31483A] focus:ring-1 focus:ring-[#31483A]"
                  />
                </div>

                {/* Submit Action with Shimmer Button */}
                <div>
                  <button
                    type="submit"
                    className="shimmer-btn w-full py-4 text-xs uppercase tracking-[0.22em] font-bold text-[#FFFCF7] rounded-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#31483A]"
                  >
                    Submit Villa Reservation Request
                  </button>
                  <p className="text-[11px] text-[#6D7168] text-center mt-3 font-normal">
                    Direct booking request. No upfront deposit or credit card required.
                  </p>
                </div>
              </form>

              {/* Submission Modal */}
              {submissionState.status !== "idle" && (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="submission-modal-title"
                  className="fixed inset-0 z-50 bg-[#252A24]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
                >
                  <div className="bg-[#FFFCF7] rounded-sm border border-[#E7DDCE] max-w-lg w-full p-6 sm:p-8 shadow-2xl">
                    {submissionState.actionType === "mailto" && (
                      <div>
                        <h3
                          id="submission-modal-title"
                          className="font-serif text-2xl text-[#252A24] font-medium mb-3"
                        >
                          Send Via Your Email App
                        </h3>
                        <p className="text-sm text-[#6D7168] leading-relaxed mb-4">
                          To ensure complete transparency and direct communication, clicking below will open your default email program (Mail, Outlook, Gmail) with your pre-filled dates and room details addressed to our reservations desk:
                        </p>
                        <div className="bg-[#F6F2EA] p-3 rounded-sm border border-[#E7DDCE] text-xs font-mono text-[#252A24] mb-6">
                          To: {inquiry.contactEmail}
                        </div>
                        <p className="text-xs text-[#6D7168] mb-6 italic">
                          Please remember to tap <strong>Send</strong> in your email app to deliver the message.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={handleLaunchExternalApp}
                            className="flex-1 py-3 text-xs uppercase tracking-wider font-medium text-[#FFFCF7] bg-[#31483A] hover:bg-[#22352A] rounded-sm"
                          >
                            Open Email Application
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubmissionState({ status: "idle" })}
                            className="py-3 px-5 text-xs uppercase tracking-wider font-medium text-[#252A24] border border-[#E7DDCE] hover:bg-[#F6F2EA] rounded-sm"
                          >
                            Return
                          </button>
                        </div>
                      </div>
                    )}

                    {submissionState.actionType === "demo" && (
                      <div>
                        <div className="flex items-center space-x-2 text-[#B18A5A] mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#B18A5A]" />
                          <span className="text-xs uppercase tracking-wider font-medium">
                            Sales Presentation Demo
                          </span>
                        </div>
                        <h3
                          id="submission-modal-title"
                          className="font-serif text-2xl text-[#252A24] font-medium mb-3"
                        >
                          Enquiry Form Validated
                        </h3>
                        <p className="text-sm text-[#6D7168] leading-relaxed mb-4">
                          All client-side validation passed (Name: <strong>{formData.name}</strong>, {formData.arrival} to {formData.departure}, {formData.guests} guests).
                        </p>
                        <p className="text-xs text-[#6D7168] bg-[#F6F2EA] p-3.5 rounded-sm border border-[#E7DDCE] leading-relaxed mb-6">
                          In this sales demonstration, no message was transmitted to a live property. When deployed for your hotel, inquiries route straight to your reservations email, WhatsApp concierge, or PMS webhook.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmissionState({ status: "idle" })}
                          className="w-full py-3 text-xs uppercase tracking-wider font-medium text-[#FFFCF7] bg-[#31483A] hover:bg-[#22352A] rounded-sm"
                        >
                          Close Demo Notice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
